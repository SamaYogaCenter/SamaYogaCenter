# 🚀 Quick Start Guide - Sama Yoga on Squarespace

## The Easiest Way to Get Started

### Option 1: Use the Complete Homepage (Recommended for Beginners)

1. **Open** `complete-homepage.html` in any text editor
2. **Copy** everything (Ctrl+A / Cmd+A, then Ctrl+C / Cmd+C)
3. **Log into** your Squarespace site
4. **Go to** the page where you want to add this content
5. **Click** the "+" button to add a new block
6. **Search** for "Code" and select **Code Block**
7. **Paste** the code and click **Apply**
8. **Preview** your page

That's it! You now have a complete homepage with:
- Hero section with call-to-action
- Mission/welcome statement
- Amenities list
- Location with map
- Final call-to-action

### Option 2: Use Individual Sections (More Flexible)

If you want more control, use individual section files:

1. **homepage-hero.html** - Add to top of homepage
2. **mission-section.html** - Add below hero
3. **amenities-section.html** - Add as standalone section
4. **location-section.html** - Add with map
5. **cta-section.html** - Add at bottom of any page

Each section is independent and can be mixed and matched.

## 📝 What You MUST Change

Before going live, update these things:

### 1. Update Links (in any HTML file)

Find and replace:
- `/schedule` → Your actual schedule page URL
- `/pricing` → Your actual pricing page URL
- `/classes` → Your actual classes page URL
- `/team` → Your actual team page URL
- `/new-to-yoga` → Your actual new to yoga page URL

### 2. Update Google Map (in location-section.html or complete-homepage.html)

1. Go to Google Maps
2. Search for your studio address
3. Click "Share" → "Embed a map"
4. Copy the iframe code
5. Replace the existing iframe in the HTML

### 3. Update "Get Directions" Link

Change:
```html
href="https://maps.google.com/?q=Sama+Yoga+Center+New+Canaan+CT"
```

To:
```html
href="https://maps.google.com/?q=YOUR+ACTUAL+STUDIO+ADDRESS"
```

### 4. Upload Your Logo (if using custom-header.html)

1. Upload logo to Squarespace
2. Right-click logo → "Copy Image Address"
3. Paste address in the header HTML where it says:
   ```html
   <img src="/path-to-your-logo/sama-yoga-logo.png"
   ```

## 🎨 Optional: Change Colors

The brand color is **#c2185b** (magenta pink).

To change it:
1. Open any HTML file
2. Find `#c2185b` (there will be several)
3. Replace with your color (e.g., `#3498db` for blue)
4. Also replace `#880e4f` (dark version) with a darker shade of your color

## 📱 Testing

Before publishing:
1. ✅ Preview in Squarespace
2. ✅ Test on mobile (use your phone or browser DevTools)
3. ✅ Click all buttons to make sure links work
4. ✅ Check that map loads correctly

## 🆘 Troubleshooting

**Code not showing up?**
- Make sure you're using a **Code Block**, not an Embed Block
- Check that you copied ALL the code including `<style>` tags

**Buttons don't work?**
- Update the link URLs to match your actual pages

**Map not showing?**
- Make sure you updated the Google Maps iframe
- Check that your Squarespace plan allows iframe embeds

## 💡 Pro Tips

1. **Mobile First:** Most visitors will be on mobile - always check mobile view
2. **Keep it Simple:** Don't change too much at once
3. **Backup:** Save a copy of any code before editing
4. **Test Links:** Click every button and link before publishing

## 🎉 You're Done!

Your Squarespace site now has beautiful, modern design elements. The code is:
- ✅ Fully responsive (mobile-friendly)
- ✅ Fast loading (no external dependencies)
- ✅ Easy to customize
- ✅ Professional looking

Enjoy your new website! 🧘‍♀️
