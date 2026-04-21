# Sama Yoga - Squarespace Embed Code

This folder contains self-contained HTML/CSS/JavaScript code that can be embedded directly into your Squarespace website using Code Blocks.

## 📁 Files Included

1. **homepage-hero.html** - Hero section with background image and call-to-action buttons
2. **mission-section.html** - Welcome/mission statement with decorative divider
3. **amenities-section.html** - List of studio amenities with icons
4. **location-section.html** - Location information with embedded Google Map
5. **cta-section.html** - Call-to-action section for conversions
6. **custom-header.html** - Custom navigation header with dropdown menu (optional)

## 🚀 How to Add Code to Squarespace

### Method 1: Using Code Blocks (Recommended for Sections)

1. **Log into your Squarespace account** and go to the page where you want to add the code
2. **Click the "+" button** to add a new content block
3. **Search for "Code"** and select the **Code Block**
4. **Copy the entire contents** of one of the HTML files (e.g., `homepage-hero.html`)
5. **Paste the code** into the Code Block
6. **Click "Apply"** to save
7. **Preview your page** to see the result

### Method 2: Header/Footer Code Injection (For Custom Header)

If you want to use the custom navigation header across all pages:

1. Go to **Settings** → **Advanced** → **Code Injection**
2. Open `custom-header.html` and copy all the code
3. Paste it into the **Header** section
4. Click **Save**
5. **Important:** You'll need to upload your logo to Squarespace and update the logo path in the code

## 📝 Customization Guide

### Updating Links

All the embedded sections include placeholder links. Update them to match your Squarespace page URLs:

- `/schedule` → Your schedule page URL
- `/pricing` → Your pricing page URL
- `/classes` → Your classes page URL
- `/team` → Your team page URL
- etc.

**How to update:**
1. Open the HTML file in a text editor (TextEdit, Notepad, VS Code, etc.)
2. Find and replace the placeholder URLs with your actual Squarespace page URLs
3. Copy the updated code and paste it into Squarespace

### Updating Colors

The primary brand color is **#c2185b** (deep magenta pink). To change it:

1. Find all instances of `#c2185b` in the code
2. Replace with your preferred color hex code
3. Also update `#880e4f` (dark version) to a darker shade of your color

### Updating the Background Image (Hero Section)

In `homepage-hero.html`, find this line:
```css
background-image: url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1920&q=80');
```

Replace the URL with:
- Your own image URL (upload it to Squarespace first)
- A different Unsplash image URL
- Leave as-is to use the current yoga image

### Updating the Google Map

In `location-section.html`, you'll need to:

1. Go to [Google Maps](https://www.google.com/maps)
2. Search for your actual studio address
3. Click **Share** → **Embed a map**
4. Copy the `<iframe>` code
5. Replace the iframe in `location-section.html` with your new one

**OR** simply update the "Get Directions" link:
```html
<a href="https://maps.google.com/?q=YOUR+ACTUAL+ADDRESS+HERE">
```

### Updating Logo (Custom Header)

In `custom-header.html`, find:
```html
<img src="/path-to-your-logo/sama-yoga-logo.png" alt="Sama Yoga Center">
```

Replace with the URL to your logo image in Squarespace:
1. Upload your logo to Squarespace
2. Right-click the uploaded logo and select "Copy Image Address"
3. Paste the address in place of `/path-to-your-logo/sama-yoga-logo.png`

## 📱 Mobile Responsive

All code sections are fully mobile-responsive and will automatically adapt to different screen sizes. The navigation header includes a hamburger menu for mobile devices.

## 🎨 Suggested Page Layout

For a complete homepage, add the sections in this order:

1. **Custom Header** (Code Injection) - Optional, only if replacing default nav
2. **Homepage Hero** (Code Block)
3. **Mission Section** (Code Block)
4. **Amenities Section** (Code Block)
5. **Location Section** (Code Block)
6. **CTA Section** (Code Block)

## ⚙️ Advanced: Custom CSS

If you want to make global style changes across all embedded sections:

1. Go to **Design** → **Custom CSS** in Squarespace
2. Add any custom styles that should apply site-wide
3. You can override any styles from the embedded code here

Example:
```css
/* Change all Sama Yoga buttons to a different color */
.sama-btn--primary,
.sama-cta-btn--primary,
.sama-location__btn,
.sama-header__cta {
  background-color: #your-color-here !important;
}
```

## 🐛 Troubleshooting

### Code Block Not Showing Up
- Make sure you're using a **Code Block**, not an **Embed Block**
- Check that you copied the ENTIRE contents of the HTML file
- Try refreshing the page

### Styles Look Weird
- Make sure no Squarespace styles are conflicting
- Try adding `!important` to specific CSS rules if needed
- Check that you didn't accidentally delete any `<style>` tags

### Mobile Menu Not Working
- Make sure the JavaScript is included (it's at the bottom of `custom-header.html`)
- Check browser console for errors (F12 → Console tab)

### Map Not Loading
- Make sure you have a valid Google Maps embed URL
- Check that iframe embeds are allowed in your Squarespace plan

## 💡 Tips

1. **Preview First:** Always preview your changes before publishing
2. **Backup:** Keep a copy of the original code before making modifications
3. **Test on Mobile:** Check how everything looks on mobile devices
4. **Consistency:** Use the same color scheme across all sections for a cohesive look

## 📞 Need Help?

If you run into issues:
1. Check the Squarespace documentation on Code Blocks
2. Test each section individually to isolate problems
3. Use browser developer tools (F12) to debug CSS/JavaScript issues

## 🎉 You're All Set!

These embed codes give you a beautiful, professional website design while keeping everything hosted on Squarespace. Enjoy your new site!
