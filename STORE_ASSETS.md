# Chrome Web Store Assets

This document describes the assets needed for publishing to the Chrome Web Store.

## Required Assets

### 1. Icons ✅
- **icon16.png** - 16x16 pixels (already created)
- **icon48.png** - 48x48 pixels (already created)  
- **icon128.png** - 128x128 pixels (already created)

### 2. Store Listing Images

You'll need to create these for the Chrome Web Store:

#### Small Promotional Tile (REQUIRED)
- **Size**: 440x280 pixels
- **Format**: PNG or JPEG
- **Purpose**: Shown in the Chrome Web Store search results and category pages

#### Screenshots (REQUIRED - at least 1, max 5)
- **Size**: 1280x800 or 640x400 pixels
- **Format**: PNG or JPEG
- **Purpose**: Show how your extension works

Recommended screenshots:
1. LinkedIn message box with auto-inserted name
2. Attachment button in action
3. File preview display
4. Profile page showing name detection

#### Large Promotional Tile (Optional)
- **Size**: 920x680 pixels
- **Format**: PNG or JPEG
- **Purpose**: Featured placement (if selected by Chrome)

#### Marquee Promotional Tile (Optional)
- **Size**: 1400x560 pixels
- **Format**: PNG or JPEG
- **Purpose**: Featured in Chrome Web Store

## How to Create Store Assets

### Option 1: Use Figma/Canva
1. Go to figma.com or canva.com
2. Create designs with the sizes above
3. Include:
   - Extension icon/logo
   - Feature highlights
   - LinkedIn branding colors (#0073b1)
   - Clear, readable text

### Option 2: Take Screenshots
For the screenshot requirements:
1. Install the extension in Chrome
2. Navigate to LinkedIn
3. Use Chrome's full-page screenshot feature
4. Crop and resize to 1280x800 pixels
5. Add annotations if helpful

### Option 3: Use the HTML Template
Create a simple HTML page similar to `generate_icons.html` to design promotional tiles.

## Store Listing Text

### Name (REQUIRED)
**LinkedIn Message Helper**

### Summary (REQUIRED - max 132 characters)
**Auto-insert first names in LinkedIn messages and quickly attach files with one click.**

### Description (REQUIRED - max 16,000 characters)
```
LinkedIn Message Helper helps you personalize your LinkedIn messages faster with two powerful features:

🎯 AUTO-INSERT NAMES
Automatically detects and inserts the recipient's first name when you open a message box. No more copying names from profiles!

📎 QUICK ATTACHMENTS  
Adds a convenient attachment button directly in the message compose area for faster file sharing.

HOW IT WORKS:
1. Install the extension
2. Navigate to LinkedIn and open any conversation
3. Click in the message box - the extension automatically inserts "Hi, [FirstName] "
4. Use the blue attachment button to quickly add files

FEATURES:
✓ Automatic first name extraction from LinkedIn profiles
✓ Smart greeting insertion: "Hi, [FirstName] "
✓ One-click attachment button
✓ File size preview
✓ Works on all LinkedIn messaging pages
✓ Non-intrusive - only acts on empty message boxes
✓ 100% privacy-focused - all processing happens locally

PRIVACY & SECURITY:
- No data collection or tracking
- No external server communication
- All processing happens locally in your browser
- Open source code

Perfect for:
- Sales professionals reaching out to prospects
- Recruiters contacting candidates
- Networkers building relationships
- Anyone who sends frequent LinkedIn messages

Save time and personalize every message with LinkedIn Message Helper!
```

### Category
**Productivity** or **Social & Communication**

### Language
**English**

## Privacy Policy (REQUIRED)

You'll need a privacy policy URL. Here's a template:

```
PRIVACY POLICY

LinkedIn Message Helper ("the Extension") is committed to protecting your privacy.

DATA COLLECTION:
The Extension does NOT collect, store, or transmit any personal data. All processing happens locally in your browser.

PERMISSIONS:
- activeTab: Required to access LinkedIn page content
- scripting: Required to insert text into message boxes
- host_permissions (linkedin.com): Required to run on LinkedIn pages

THIRD-PARTY SERVICES:
The Extension does not use any third-party services or analytics.

CHANGES:
This privacy policy may be updated. Check this page for changes.

CONTACT:
[Your contact email]

Last updated: March 8, 2026
```

You can host this on:
- GitHub Pages (in your repo)
- A simple static site
- Google Sites

## Before Publishing Checklist

- [ ] Icons created (16, 48, 128px)
- [ ] At least 1 screenshot (1280x800)
- [ ] Small promotional tile (440x280)
- [ ] Store description written
- [ ] Privacy policy hosted and URL ready
- [ ] Extension tested in Chrome
- [ ] manifest.json validated
- [ ] Extension packaged as .zip

## Useful Tools

- **Figma**: figma.com (design assets)
- **Canva**: canva.com (design assets)
- **GitHub Pages**: pages.github.com (host privacy policy)
- **CloudConvert**: cloudconvert.com (convert/resize images)
