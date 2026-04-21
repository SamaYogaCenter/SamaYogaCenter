# Sama Yoga Center - Website Redesign

A modern, responsive website for Sama Yoga Center built with pure HTML, CSS, and JavaScript.

## 🎨 Features

- **Clean, Modern Design** - Calming color palette with elegant typography
- **Fully Responsive** - Mobile-first approach that works on all devices
- **Smooth Animations** - Subtle scroll animations and micro-interactions
- **Accessible** - Semantic HTML, keyboard navigation, ARIA attributes
- **Fast Loading** - No heavy frameworks, optimized for performance
- **Easy to Customize** - Well-organized code with CSS variables for theming

## 📁 Project Structure

```
sama-yoga-redesign/
├── index.html              # Homepage
├── classes.html            # Classes & schedule page
├── new-to-yoga.html        # Beginner guide page
├── contact.html            # Contact form page
├── css/
│   ├── reset.css           # Browser reset
│   ├── variables.css       # Design tokens (colors, spacing, fonts)
│   ├── layout.css          # Grid, flexbox, utilities
│   ├── components.css      # Reusable UI components
│   └── pages/              # Page-specific styles (to be added)
├── js/
│   ├── navigation.js       # Mobile menu, scroll behavior
│   ├── animations.js       # Scroll animations, parallax
│   ├── booking-widget.js   # Booking integration (placeholder)
│   └── forms.js            # Form validation
├── images/                 # Image assets (empty - add your own)
└── assets/                 # Icons, fonts, videos (empty)
```

## 🚀 Getting Started

### View Locally

1. **Open in browser:**
   - Navigate to the project folder
   - Double-click `index.html` to open in your browser
   - OR right-click and choose "Open with" → your preferred browser

2. **Use a local server (recommended):**
   ```bash
   # Using Python 3
   cd sama-yoga-redesign
   python3 -m http.server 8000

   # Then open: http://localhost:8000
   ```

   ```bash
   # Using Node.js (npx http-server)
   npx http-server sama-yoga-redesign -p 8000

   # Then open: http://localhost:8000
   ```

### Test Responsiveness

- **Chrome DevTools:** Press F12 → Click device toolbar icon (or Ctrl+Shift+M / Cmd+Shift+M)
- **Firefox:** Press F12 → Click responsive design mode icon (or Ctrl+Shift+M / Cmd+Opt+M)
- Test on actual devices for best results

## 🎯 Current Pages

✅ **Completed:**
- Homepage (`index.html`) - Hero, featured classes, testimonials
- Classes (`classes.html`) - Class types, schedule, pricing
- New to Yoga (`new-to-yoga.html`) - Beginner guide, FAQ, intro offer
- Contact (`contact.html`) - Contact form, location, hours

🔄 **To Be Created:**
- Teachers page
- Teacher Training page
- Events & Retreats page
- About page

## 🔧 Customization

### Colors

Edit `css/variables.css` to change the color scheme:

```css
:root {
  --color-primary: #5a7a6e;        /* Main brand color */
  --color-secondary: #d4a574;      /* Secondary accent */
  --color-accent: #c17767;         /* Tertiary accent */
  /* ... */
}
```

### Typography

Change fonts in `css/variables.css`:

```css
:root {
  --font-body: 'Inter', sans-serif;
  --font-heading: 'Playfair Display', serif;
  /* ... */
}
```

### Content

Replace placeholder text and update:
- Studio name, address, phone, email
- Class descriptions and pricing
- Images (currently using Unsplash placeholders)
- Social media links

### Images

Current pages use Unsplash placeholder images. Replace with your own:
1. Add images to the `/images` folder
2. Update image `src` attributes in HTML files
3. Optimize images (compress, use WebP format)

## 📦 Next Steps

### 1. Complete Remaining Pages

Create HTML files for:
- `teachers.html` - Instructor profiles
- `teacher-training.html` - 200-hour program details
- `events.html` - Retreats and special events
- `about.html` - Studio story, philosophy, blog

### 2. Integrate Booking System

Replace the placeholder in `classes.html` with a real booking widget:

**Recommended platforms:**
- [ClassFit](https://classfit.com/)
- [Momoyoga](https://www.momoyoga.com/)
- [SimplyBook.me](https://simplybook.me/)
- [Elfsight](https://elfsight.com/)

**Integration steps:**
1. Sign up for a booking platform
2. Configure your class schedule
3. Get embed code or API credentials
4. Add to `js/booking-widget.js`
5. Replace placeholder div in `classes.html`

### 3. Add Real Content

- Migrate content from current Squarespace site
- Professional photography of studio space
- Teacher bios and headshots
- Class descriptions
- Pricing information
- Blog posts (if applicable)

### 4. Form Integration

The contact form currently uses client-side JavaScript. For production:

**Options:**
- **Formspree** - Simple, free tier available
- **Netlify Forms** - Free with Netlify hosting
- **EmailJS** - Client-side email sending
- **Custom backend** - Your own server/API

Update `js/forms.js` with your chosen integration.

### 5. Google Maps

Add your studio location to `contact.html`:
1. Go to [Google Maps](https://www.google.com/maps)
2. Search for your address
3. Click "Share" → "Embed a map"
4. Copy the iframe code
5. Replace the placeholder map section

### 6. SEO & Analytics

- Update meta tags (title, description) on each page
- Add Open Graph tags for social sharing
- Create `sitemap.xml`
- Add `robots.txt`
- Integrate Google Analytics (optional)

### 7. Performance Optimization

- Compress images (use TinyPNG, ImageOptim, or Squoosh)
- Convert images to WebP format
- Minify CSS and JavaScript
- Enable lazy loading for images
- Consider using a CDN

### 8. Testing

- ✅ Test on multiple browsers (Chrome, Safari, Firefox, Edge)
- ✅ Test on various screen sizes
- ✅ Run Lighthouse audit in Chrome DevTools
- ✅ Check accessibility (keyboard navigation, screen readers)
- ✅ Validate HTML (W3C Validator)

### 9. Deployment

**Free hosting options:**
- **Netlify** - Drag & drop, automatic HTTPS
- **Vercel** - Git integration, fast CDN
- **GitHub Pages** - Free for public repos
- **Cloudflare Pages** - Fast, free tier

**Deployment steps (Netlify example):**
1. Sign up at [netlify.com](https://netlify.com)
2. Drag the `sama-yoga-redesign` folder to Netlify
3. Configure custom domain (if desired)
4. Done! Site is live with HTTPS

### 10. Domain Setup

- Transfer domain from Squarespace or register new one
- Point DNS to new hosting provider
- Configure SSL certificate (usually automatic)

## 🎨 Design System

### Color Palette
- **Primary (Sage Green):** #5a7a6e - Main brand color, buttons, links
- **Secondary (Warm Tan):** #d4a574 - Accents, badges
- **Accent (Terracotta):** #c17767 - Special highlights, CTAs
- **Neutrals:** Grays for text, backgrounds, borders

### Typography Scale
- **Headings:** Playfair Display (serif) - Elegant, spiritual
- **Body:** Inter (sans-serif) - Clean, readable
- **Sizes:** 12px to 60px responsive scale

### Spacing Scale
- Based on 4px unit
- XS (4px) → 5XL (128px)

### Components
- Buttons (primary, secondary, outline variants)
- Cards (with image, content, footer)
- Forms (inputs, textareas, selects)
- Navigation (responsive, mobile menu)
- Hero sections
- Testimonials
- Footer

## 📱 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile Safari (iOS 12+)
- Chrome for Android

## 🐛 Troubleshooting

**Issue:** Fonts not loading
- **Fix:** Check internet connection (Google Fonts are loaded from CDN)

**Issue:** Mobile menu not working
- **Fix:** Ensure `navigation.js` is loaded correctly

**Issue:** Images not showing
- **Fix:** Check image paths are correct (relative to HTML file)

**Issue:** Styles not applying
- **Fix:** Check CSS file paths in `<head>` section

## 📝 License

This project is designed for Sama Yoga Center. Modify as needed for your use.

## 🤝 Support

For questions or assistance:
- Check the code comments
- Review the plan file: `.claude/plans/purring-exploring-marble.md`
- Test in browser developer tools (F12)

---

**Built with ❤️ using pure HTML, CSS, and JavaScript**
