/**
 * sync-eventbrite.js
 *
 * Reads data/events.json and syncs all upcoming, visible events to Eventbrite
 * as free listings. Each listing links back to the event's expanded section on
 * samayogacenter.com/events.html — actual registration stays on MindBody.
 *
 * ─── Setup (one-time) ───────────────────────────────────────────────────────
 *  1. Confirm VENUE_ADDRESS below is Sama Yoga's street address.
 *  2. Add ONE GitHub Secret to the repo (Settings → Secrets and variables → Actions):
 *       EVENTBRITE_TOKEN — your Eventbrite private token
 *                          (eventbrite.com/platform/api-keys → "Create API Key")
 *     The organization id is discovered automatically from the token. Only add an
 *     EVENTBRITE_ORGANIZATION_ID secret if your account has multiple organizations.
 *  3. Run the workflow once (Actions tab → "Sync Events to Eventbrite" → Run workflow)
 *     to test, then it runs automatically whenever data/events.json changes.
 *
 * ─── Running locally to test ────────────────────────────────────────────────
 *  EVENTBRITE_TOKEN=xxx node scripts/sync-eventbrite.js
 * ────────────────────────────────────────────────────────────────────────────
 */

'use strict';
const https = require('https');
const fs    = require('fs');
const path  = require('path');


// ─── ✏️  Fill this in before first run ───────────────────────────────────────
const VENUE_ADDRESS = {
  name:        'Sama Yoga Center',
  address_1:   '45 Grove Street',
  city:        'New Canaan',
  region:      'CT',
  postal_code: '06840',
  country:     'US',
};
// ─────────────────────────────────────────────────────────────────────────────

// Injected by GitHub Actions from repository Secrets — do not change these lines
const TOKEN        = process.env.EVENTBRITE_TOKEN;
let   ORG_ID       = process.env.EVENTBRITE_ORGANIZATION_ID || '';  // auto-discovered if blank
const ORGANIZER_ID = process.env.EVENTBRITE_ORGANIZER_ID    || '';  // optional brand/profile id

const SITE_URL = 'https://samayogacenter.com';
const TIMEZONE = 'America/New_York';

const EVENTS_FILE = path.join(__dirname, '../data/events.json');
const IDS_FILE    = path.join(__dirname, '../data/eventbrite-ids.json');


// ─── Eventbrite API helper ────────────────────────────────────────────────────

function ebRequest(method, endpoint, body) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const req = https.request(
      {
        hostname: 'www.eventbriteapi.com',
        path:     endpoint,
        method,
        headers: {
          Authorization:  `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
          ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
        },
      },
      res => {
        let raw = '';
        res.on('data', chunk => (raw += chunk));
        res.on('end', () => {
          let json;
          try { json = JSON.parse(raw); }
          catch { return reject(new Error(`Non-JSON response (${res.statusCode}): ${raw.slice(0, 200)}`)); }
          if (json.error) return reject(new Error(`Eventbrite error — ${json.error}: ${json.error_description}`));
          resolve(json);
        });
      }
    );
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}


// ─── Organization helper ──────────────────────────────────────────────────────
// Every event/venue is created under an Organization. If EVENTBRITE_ORGANIZATION_ID
// isn't provided, discover it from the token's account.

async function getOrganizationId() {
  if (ORG_ID) return ORG_ID;
  const res = await ebRequest('GET', '/v3/users/me/organizations/');
  const org = (res.organizations || [])[0];
  if (!org) throw new Error('No Eventbrite organization found for this token. Set EVENTBRITE_ORGANIZATION_ID.');
  console.log(`Using Eventbrite organization: ${org.name} (${org.id})\n`);
  return org.id;
}


// ─── Venue helper ─────────────────────────────────────────────────────────────
// Creates the Sama Yoga Center venue on first run; caches the ID in eventbrite-ids.json.

async function getOrCreateVenue(ids) {
  if (ids.__venue_id__) return ids.__venue_id__;

  if (!VENUE_ADDRESS.address_1) {
    console.log('ℹ️  No street address set in VENUE_ADDRESS — events will be created without a venue location.');
    console.log('   Add address_1 to the VENUE_ADDRESS constant in sync-eventbrite.js to fix this.\n');
    return null;
  }

  console.log('Creating Sama Yoga Center venue on Eventbrite (first run only)...');
  const result = await ebRequest('POST', `/v3/organizations/${ORG_ID}/venues/`, {
    venue: {
      name:    VENUE_ADDRESS.name,
      address: {
        address_1:   VENUE_ADDRESS.address_1,
        city:        VENUE_ADDRESS.city,
        region:      VENUE_ADDRESS.region,
        postal_code: VENUE_ADDRESS.postal_code,
        country:     VENUE_ADDRESS.country,
      },
    },
  });

  console.log(`   ✅ Venue created — ID: ${result.id}\n`);
  return result.id;
}


// ─── Time / date helpers ──────────────────────────────────────────────────────

function to24h(hour, ampm) {
  hour = +hour;
  if (ampm.toUpperCase() === 'AM') return hour === 12 ? 0 : hour;
  return hour === 12 ? 12 : hour + 12;
}

/**
 * Parses time strings from events.json into { startH, startM, endH, endM }.
 * Handles formats like "1:00-3:00 PM", "12:30-3:30 PM", "10:00 AM-12:00 PM".
 */
function parseTimeRange(str) {
  str = str.trim();

  // Both sides explicit: "10:00 AM-12:00 PM"
  let m = str.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)\s*[-–]\s*(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (m) return { startH: to24h(m[1], m[3]), startM: +m[2], endH: to24h(m[4], m[6]), endM: +m[5] };

  // Shared AM/PM at end: "1:00-3:00 PM"
  m = str.match(/^(\d{1,2}):(\d{2})\s*[-–]\s*(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (m) return { startH: to24h(m[1], m[5]), startM: +m[2], endH: to24h(m[3], m[5]), endM: +m[4] };

  throw new Error(`Cannot parse time string: "${str}"`);
}

/**
 * Converts a local ET date + hour + minute to a UTC ISO string.
 * Uses approximate DST: EDT (UTC-4) March–November, EST (UTC-5) December–February.
 */
function toUtcString(dateISO, h, m) {
  const month = +dateISO.split('-')[1];
  const offsetH = (month >= 3 && month <= 11) ? 4 : 5;
  const local = new Date(`${dateISO}T${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00`);
  local.setHours(local.getHours() + offsetH);
  return local.toISOString().replace(/\.\d{3}Z$/, 'Z');
}


// ─── Description builder ──────────────────────────────────────────────────────

/** Converts the subset of Markdown used in events.json into HTML. */
function mdToHtml(md) {
  if (!md) return '';
  return md
    .split(/\n{2,}/)
    .map(block => {
      // Unordered list block
      if (/^[-*] /m.test(block)) {
        const items = block
          .split('\n')
          .filter(l => l.trim())
          .map(l => `<li>${inlineMd(l.replace(/^[-*]\s+/, ''))}</li>`)
          .join('');
        return `<ul>${items}</ul>`;
      }
      // Heading
      if (/^#{1,3} /.test(block)) {
        return `<h3>${inlineMd(block.replace(/^#{1,3} /, ''))}</h3>`;
      }
      // Paragraph (single line-breaks → <br>)
      return `<p>${inlineMd(block.replace(/\n/g, '<br>'))}</p>`;
    })
    .join('\n');
}

function inlineMd(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g,       '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,            '<em>$1</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g,  '<a href="$2">$1</a>');
}

/** Event body + pricing as HTML (shared by the legacy description and structured content). */
function buildBodyHtml(event) {
  const bodyHtml = mdToHtml(event.description || event.cardDescription || '');

  const pricingHtml = (event.pricing || []).length
    ? '<h3>Pricing</h3><ul>' +
      event.pricing.map(p => `<li><strong>${p.label}:</strong> ${p.price}</li>`).join('') +
      '</ul>'
    : '';

  return [bodyHtml, pricingHtml].filter(Boolean).join('\n');
}

/**
 * The legacy `description` field. Eventbrite renders BOTH this and structured
 * content on the listing page, so putting the body in both makes it appear twice.
 * The full body + link live in structured content (setStructuredContent); this is
 * deliberately a single line so nothing is duplicated.
 */
function buildDescription(event) {
  return '<p>Full details, pricing, and registration are on our website — visit <strong>samayogacenter.com/events</strong>.</p>';
}

/**
 * The standard admission price to advertise: the non-member, non-early-bird,
 * single-class rate. Bundles/packages are excluded, and since early-bird and
 * member rates are discounts, the full price is the highest remaining tier.
 * Returns a display string like "$150", or null if the event has no pricing.
 */
function headlinePrice(event) {
  const toNum = s => parseFloat(String(s).replace(/[^0-9.]/g, '')) || 0;
  const all   = event.pricing || [];
  const tiers = all.filter(p => !/bundle|package/i.test(p.label || ''));
  const pool  = tiers.length ? tiers : all;
  if (!pool.length) return null;
  return pool.reduce((hi, p) => (toNum(p.price) > toNum(hi.price) ? p : hi)).price;
}

/**
 * Creates or updates the event's single free ticket. Eventbrite collects no
 * payment (that happens on MindBody), so the ticket is free — but the real
 * admission price is put in the ticket NAME so visitors see it instead of only
 * a bare "Free". Runs on every sync so existing listings pick up the change.
 */
async function syncTicket(eventId, event) {
  const price = headlinePrice(event);
  const ticket = {
    name:           price ? `${price} · register on our website` : 'Register at samayogacenter.com',
    description:    'Registration and payment are on our website, not through Eventbrite — visit samayogacenter.com/events to sign up through MindBody.',
    free:           true,
    quantity_total: 500,
  };

  const existing = await ebRequest('GET', `/v3/events/${eventId}/ticket_classes/`);
  const current  = (existing.ticket_classes || [])[0];
  if (current) {
    await ebRequest('POST', `/v3/events/${eventId}/ticket_classes/${current.id}/`, { ticket_class: ticket });
  } else {
    await ebRequest('POST', `/v3/events/${eventId}/ticket_classes/`, { ticket_class: ticket });
  }
}

/**
 * Publishes the rich description Eventbrite actually shows on the listing page.
 * Unlike the legacy description field, structured-content text modules keep
 * clickable links — so the "register on our website" call-to-action renders as a
 * proper link (labelled text, not a raw URL). Best-effort: the caller ignores
 * failures so a listing still publishes with the plain-text description.
 */
async function setStructuredContent(eventId, event) {
  const siteLink = `${SITE_URL}/events.html#${event.id}`;

  const ctaHtml =
    '<p><strong>Registration is through the Sama Yoga Center website — not through Eventbrite.</strong></p>' +
    `<p><a href="${siteLink}">register at samayogacenter.com</a></p>`;

  // New content must be posted at (current version + 1); a fresh event has none.
  let version = 0;
  try {
    const current = await ebRequest('GET', `/v3/events/${eventId}/structured_content/`);
    version = current.page_version_number || 0;
  } catch { /* no structured content yet — start at version 1 */ }

  await ebRequest('POST', `/v3/events/${eventId}/structured_content/${version + 1}/`, {
    publish: true,
    purpose: 'listing',
    modules: [
      { type: 'text', data: { body: { type: 'text', text: buildBodyHtml(event), alignment: 'left' } } },
      { type: 'text', data: { body: { type: 'text', text: ctaHtml,              alignment: 'left' } } },
    ],
  });
}


// ─── Main sync ────────────────────────────────────────────────────────────────

async function main() {
  if (!TOKEN) {
    console.error('❌  EVENTBRITE_TOKEN must be set.');
    console.error('   Add it as a GitHub Secret, or export it before running locally.');
    process.exit(1);
  }

  // Resolve the organization id (auto-discovered from the token if not provided).
  ORG_ID = await getOrganizationId();

  const eventsData = JSON.parse(fs.readFileSync(EVENTS_FILE, 'utf8'));
  const ids        = fs.existsSync(IDS_FILE) ? JSON.parse(fs.readFileSync(IDS_FILE, 'utf8')) : {};
  const today      = new Date().toISOString().slice(0, 10);  // "YYYY-MM-DD"

  // Ensure venue exists (creates it on first run)
  const venueId = await getOrCreateVenue(ids);
  if (venueId) ids.__venue_id__ = venueId;

  for (const event of eventsData.events) {
   try {
    const slug = event.id;

    // Events without a machine-readable date can't be scheduled on Eventbrite
    if (!event.dateISO) {
      console.log(`⏭  Skipping "${event.title}" — no dateISO field.`);
      continue;
    }

    const isPast   = event.dateISO < today;
    const isHidden = event.hidden === true;

    // Remove from Eventbrite if hidden or past
    if (isHidden || isPast) {
      if (ids[slug]) {
        const reason = isHidden ? 'marked hidden' : 'date has passed';
        console.log(`🔒  Unpublishing "${event.title}" (${reason})`);
        try { await ebRequest('POST', `/v3/events/${ids[slug]}/unpublish/`); }
        catch (e) { console.warn(`   Could not unpublish (may already be draft): ${e.message}`); }
      }
      continue;
    }

    // Parse time
    let times;
    try { times = parseTimeRange(event.time); }
    catch (e) {
      console.warn(`⚠️  Skipping "${event.title}" — ${e.message}`);
      continue;
    }

    const displayName = event.instructor
      ? `${event.title} with ${event.instructor}`
      : event.title;

    const eventPayload = {
      event: {
        name:         { html: displayName },
        description:  { html: buildDescription(event) },
        start:        { timezone: TIMEZONE, utc: toUtcString(event.dateISO, times.startH, times.startM) },
        end:          { timezone: TIMEZONE, utc: toUtcString(event.dateISO, times.endH,   times.endM)   },
        currency:     'USD',
        online_event: false,
        ...(ORGANIZER_ID ? { organizer_id: ORGANIZER_ID } : {}),
        ...(venueId ? { venue_id: venueId } : {}),
        listed:       true,
        shareable:    true,
        invite_only:  false,
        capacity:     100,
      },
    };

    if (ids[slug]) {
      // ── Update existing listing ──────────────────────────────────────────
      console.log(`🔄  Updating: ${event.title}`);
      await ebRequest('POST', `/v3/events/${ids[slug]}/`, eventPayload);
      // Refresh the ticket so the price shows (and existing "Free" tickets get renamed)
      try { await syncTicket(ids[slug], event); }
      catch (e) { console.warn(`   (ticket update skipped: ${e.message})`); }
      // Re-publish in case the event was previously unpublished
      try { await ebRequest('POST', `/v3/events/${ids[slug]}/publish/`); }
      catch { /* already published — fine */ }
      // Rich description with the working, nicely-labelled website link
      try { await setStructuredContent(ids[slug], event); }
      catch (e) { console.warn(`   (rich description skipped: ${e.message})`); }

    } else {
      // ── Create new listing ───────────────────────────────────────────────
      console.log(`✨  Creating: ${event.title}`);
      const created = await ebRequest('POST', `/v3/organizations/${ORG_ID}/events/`, eventPayload);
      ids[slug] = created.id;

      // Add the free ticket (a listing needs one to publish); its name carries the price
      await syncTicket(created.id, event);

      await ebRequest('POST', `/v3/events/${created.id}/publish/`);
      // Rich description with the working, nicely-labelled website link
      try { await setStructuredContent(created.id, event); }
      catch (e) { console.warn(`   (rich description skipped: ${e.message})`); }
      console.log(`   ✅  Published — Eventbrite ID: ${created.id}`);
    }
   } catch (e) {
     console.warn(`⚠️  Error with "${event.title}" — ${e.message} (skipped, others continue)`);
   }
  }

  // Write the updated ID map back to disk — the GitHub Action commits this file
  fs.writeFileSync(IDS_FILE, JSON.stringify(ids, null, 2));
  console.log('\n✅  All done. data/eventbrite-ids.json updated.');
}

main().catch(err => {
  console.error('\n❌  Sync failed:', err.message);
  process.exit(1);
});
