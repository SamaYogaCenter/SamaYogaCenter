# 📋 Installation Steps for Squarespace

## Step-by-Step Visual Guide

### Method 1: Complete Homepage (Recommended)

#### Step 1: Open the File
1. Navigate to the `squarespace-embed` folder
2. Open `complete-homepage.html` in any text editor (TextEdit, Notepad, etc.)
3. Select All (Ctrl+A or Cmd+A)
4. Copy (Ctrl+C or Cmd+C)

#### Step 2: Log into Squarespace
1. Go to your Squarespace website
2. Click **"Edit"** to enter edit mode
3. Navigate to the page where you want to add the content (usually Homepage)

#### Step 3: Add a Code Block
1. Click the **"+"** button where you want to add content
2. In the search box, type **"Code"**
3. Click on **"Code"** block (it should have a `</>` icon)

#### Step 4: Paste the Code
1. A code editor will appear
2. Paste your copied code (Ctrl+V or Cmd+V)
3. Click **"Apply"** button

#### Step 5: Preview & Publish
1. Click **"Preview"** to see how it looks
2. Test on mobile view (click the mobile icon)
3. If everything looks good, click **"Save"** and then **"Publish"**

---

## Method 2: Individual Sections

If you want to add sections separately:

#### Example: Adding the Hero Section

1. **Copy** the code from `homepage-hero.html`
2. **Click "+"** where you want it (top of page usually)
3. **Add Code Block**
4. **Paste code** and click **Apply**

#### Example: Adding the Amenities Section

1. **Copy** the code from `amenities-section.html`
2. **Click "+"** below your hero section
3. **Add Code Block**
4. **Paste code** and click **Apply**

Repeat for each section you want to add.

---

## Method 3: Custom Header (Advanced)

⚠️ **Warning:** This will replace your default Squarespace navigation

#### Step 1: Prepare Your Logo
1. Upload your logo to Squarespace
2. Right-click the logo → "Copy Image Address"
3. Save this URL - you'll need it

#### Step 2: Update the Code
1. Open `custom-header.html`
2. Find this line:
   ```html
   <img src="/path-to-your-logo/sama-yoga-logo.png" alt="Sama Yoga Center">
   ```
3. Replace `/path-to-your-logo/sama-yoga-logo.png` with your logo URL
4. Update all the navigation links to match your pages
5. Save the file

#### Step 3: Add to Code Injection
1. In Squarespace, go to **Settings** → **Advanced** → **Code Injection**
2. Copy ALL the code from `custom-header.html`
3. Paste into the **Header** section
4. Click **Save**

#### Step 4: Hide Default Navigation
1. Go to **Design** → **Site Styles**
2. Find the navigation section
3. Hide or reduce the default navigation if needed

---

## 🔧 Customization After Installation

### Update Links

After pasting the code, you need to update the links:

1. **In Code Block:** Click the code block to edit
2. **Find & Replace:** Use your text editor to find:
   - `/schedule` → Replace with your schedule page URL
   - `/pricing` → Replace with your pricing page URL
   - `/classes` → Replace with your classes page URL
   - etc.
3. **Click Apply** to save changes

### Change Colors

To change the brand color:

1. **In Code Block:** Click to edit
2. **Find:** `#c2185b` (the magenta pink color)
3. **Replace with:** Your color (e.g., `#3498db` for blue)
4. **Also replace:** `#880e4f` with a darker version of your color
5. **Click Apply** to save

### Update Google Map

1. Go to [Google Maps](https://maps.google.com)
2. Search for your studio address
3. Click **"Share"** → **"Embed a map"**
4. Copy the `<iframe>` code
5. **In your Code Block:** Find the existing `<iframe>` tag
6. Replace it with your new iframe code
7. **Click Apply**

---

## 📱 Testing Checklist

After installation, test these things:

### Desktop Testing
- [ ] Page loads correctly
- [ ] Hero image displays
- [ ] All buttons are clickable
- [ ] Links go to correct pages
- [ ] Map loads properly
- [ ] Colors look correct

### Mobile Testing
- [ ] Open site on your phone OR
- [ ] Use browser mobile view (F12 → toggle device toolbar)
- [ ] Check that everything is readable
- [ ] Test that buttons work
- [ ] Verify menu (if using custom header)

### Link Testing
Click each of these:
- [ ] "View Schedule" button
- [ ] "New to Yoga?" button
- [ ] "Get Directions" button
- [ ] "View Class Schedule" button
- [ ] "Try Our Intro Offer" button
- [ ] All navigation links (if using custom header)

---

## 🆘 Common Issues & Solutions

### Issue: Code Block is Empty After Pasting
**Solution:** Make sure you copied the ENTIRE file including the `<style>` tags at the top.

### Issue: Buttons Don't Do Anything
**Solution:** Update the `href` attributes with your actual page URLs.

### Issue: Map Doesn't Load
**Solution:**
1. Check that you have a valid Google Maps embed URL
2. Make sure your Squarespace plan allows iframes
3. Try refreshing the page

### Issue: Colors Look Wrong
**Solution:** Check that Squarespace's default styles aren't conflicting. You may need to add `!important` to some CSS rules.

### Issue: Mobile Menu Not Working (Custom Header)
**Solution:**
1. Make sure JavaScript is included at the bottom of the code
2. Check browser console for errors (F12 → Console)
3. Verify you copied ALL the code

### Issue: Looks Different Than Expected
**Solution:**
1. Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)
2. Check in an incognito window
3. Verify you're in edit mode on the correct page

---

## 💡 Pro Tips

1. **Start Simple:** Use `complete-homepage.html` first, then customize
2. **Save Backups:** Keep a copy of your original code before editing
3. **Test Often:** Preview after every change
4. **Mobile First:** Most visitors use mobile - check mobile view first
5. **One Change at a Time:** Don't change multiple things at once
6. **Use Preview:** Always preview before publishing

---

## 🎉 You're All Set!

Once installed, your Squarespace site will have:
- Beautiful modern design
- Mobile-responsive layout
- Professional appearance
- Easy-to-update content

If you need to make changes later, just click the code block and edit!

---

**Need More Help?**
- Check `README.md` for detailed documentation
- Check `QUICK-START.md` for quick reference
- Check Squarespace's Code Block documentation
