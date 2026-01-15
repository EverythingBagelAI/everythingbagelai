# How to Add Your Logo/Favicon

Your project already has a favicon.ico file at `app/favicon.ico`, but you can replace it with your own logo.

## Quick Method: Replace the Favicon

### Option 1: Using a Favicon Generator (Easiest)

1. **Prepare your logo:**
   - Use a square image (recommended: 512x512px or larger)
   - PNG or JPG format
   - Make sure it looks good at small sizes

2. **Generate favicon files:**
   - Go to: https://realfavicongenerator.net/
   - Upload your logo image
   - Download the generated package

3. **Replace the files:**
   ```bash
   # In your project directory:
   # Copy the generated favicon.ico to app/favicon.ico
   cp ~/Downloads/favicon_package/favicon.ico app/favicon.ico

   # Optional: Add additional icon files
   cp ~/Downloads/favicon_package/apple-touch-icon.png app/apple-icon.png
   ```

### Option 2: Manual Method (Simple)

If you already have your logo as a square image:

1. **Convert to ICO format:**
   - Go to: https://convertio.co/png-ico/
   - Upload your logo (PNG/JPG)
   - Download the .ico file

2. **Replace the favicon:**
   ```bash
   # Place your logo.ico in the app directory
   mv ~/Downloads/logo.ico "/Users/jordanheap/Coding Projects/EverythingBagelAI/app/favicon.ico"
   ```

## Advanced Method: Multiple Icon Formats

Next.js automatically picks up these files from the `app/` directory:

### File Names & Sizes:

| File Name | Purpose | Recommended Size |
|-----------|---------|------------------|
| `favicon.ico` | Browser tab icon | 32x32px |
| `icon.png` | Modern browsers | 32x32px or any size |
| `icon.svg` | Vector icon (best quality) | Any size |
| `apple-icon.png` | iOS home screen | 180x180px |

### Steps:

1. **Create your icon files** with the exact names above
2. **Place them in the `app/` directory:**
   ```
   app/
   ├── favicon.ico       # Browser tab icon
   ├── icon.png          # Alternative icon
   ├── icon.svg          # Vector icon (optional)
   └── apple-icon.png    # iOS icon (optional)
   ```

3. **Commit and deploy:**
   ```bash
   git add app/favicon.ico app/icon.png app/apple-icon.png
   git commit -m "feat: add custom logo/favicon"
   git push
   ```

## What Happens Automatically:

Next.js will automatically:
- ✅ Serve the favicon at `/favicon.ico`
- ✅ Generate `<link>` tags in the HTML `<head>`
- ✅ Show your logo in browser tabs
- ✅ Show your logo in Vercel deployment previews
- ✅ Show your logo when users bookmark your site

## Testing:

After deploying:
1. Visit your site: https://everythingbagelai.consulting
2. Look at the browser tab - you should see your logo
3. Bookmark the page - your logo should appear in bookmarks
4. Open on mobile - your logo should appear if saved to home screen

## Troubleshooting:

**Logo not showing after deployment?**
- Hard refresh your browser: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)
- Clear browser cache
- Check the file is in the correct location: `app/favicon.ico`
- Wait 2-3 minutes for Vercel to rebuild

**Logo looks blurry?**
- Use a higher resolution source image (512x512px or larger)
- Consider using SVG format for best quality: `app/icon.svg`

## Current Status:

✅ Favicon file exists at: `app/favicon.ico`
📝 To replace it, follow Option 1 or Option 2 above

## Need Help?

If you have a logo file ready, I can help you:
1. Convert it to the right format
2. Place it in the correct location
3. Commit and deploy the changes

Just provide your logo file path!
