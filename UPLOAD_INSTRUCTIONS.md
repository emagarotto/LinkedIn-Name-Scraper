# Chrome Web Store Upload Instructions

## ✅ Package Ready!

Your extension is packaged and ready to upload: **`linkedin-name-extractor.zip`**

## Prerequisites

1. **Google Account** - You'll need a Google account
2. **Developer Fee** - One-time $5 registration fee
3. **Privacy Policy** - Host your privacy policy (see STORE_ASSETS.md)

## Step-by-Step Upload Process

### 1. Register as Chrome Web Store Developer

1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Sign in with your Google account
3. Pay the one-time $5 developer registration fee
4. Accept the developer agreement

### 2. Upload Your Extension

1. In the Developer Dashboard, click **"New Item"**
2. Click **"Choose file"** and select `linkedin-name-extractor.zip`
3. Click **"Upload"**
4. Wait for the upload to complete (should take a few seconds)

### 3. Fill Out Store Listing

#### Store Listing Tab

**Product Details:**
- **Name**: LinkedIn Message Helper
- **Summary**: Auto-insert first names in LinkedIn messages and quickly attach files with one click.
- **Description**: (Copy from STORE_ASSETS.md)
- **Category**: Choose "Productivity" or "Social & Communication"
- **Language**: English

**Graphic Assets:**
- **Icon**: Already included in the zip (128x128)
- **Small tile**: 440x280 (you need to create this - see STORE_ASSETS.md)
- **Screenshots**: At least 1, max 5 (1280x800 pixels)
  - Take screenshots of the extension working on LinkedIn
  - Show the name insertion feature
  - Show the attachment button

**Additional Fields:**
- **Official URL**: (Optional) Your website or GitHub repo
- **Support URL**: (Optional) GitHub issues page or support email

#### Privacy Practices Tab

1. **Single Purpose**: "Enhance LinkedIn messaging with auto-name insertion and quick attachments"
2. **Permission Justification**:
   - `activeTab`: "Access LinkedIn pages to read profile names and insert greetings"
   - `scripting`: "Inject greeting text into LinkedIn message boxes"
   - `host_permissions (linkedin.com)`: "Run extension only on LinkedIn.com"

3. **Data Usage**: Select "Does not collect user data"
4. **Privacy Policy**: Enter your hosted privacy policy URL

#### Distribution Tab

1. **Visibility**: Choose "Public" or "Unlisted"
   - Public: Anyone can find it in the store
   - Unlisted: Only people with the link can install
2. **Regions**: Select which countries/regions
3. **Pricing**: Free

### 4. Submit for Review

1. Review all information
2. Click **"Submit for Review"**
3. Your extension will be reviewed by Google (typically 1-3 business days)
4. You'll receive an email when approved or if changes are needed

## Testing Before Publishing

### Local Testing (Recommended)

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (top right toggle)
3. Click "Load unpacked"
4. Select the folder containing your extension files
5. Test thoroughly on LinkedIn:
   - Message boxes
   - Profile pages
   - Different conversation types

### Test the Packaged Version

1. In `chrome://extensions/`, click "Pack extension"
2. Select your extension folder
3. This creates a .crx file
4. Drag the .crx file into Chrome to install
5. Test again to ensure packaging didn't break anything

## After Approval

Once approved, you'll receive an email and your extension will be live on the Chrome Web Store!

Your extension URL will be:
```
https://chrome.google.com/webstore/detail/[extension-id]
```

## Publishing Checklist

- [ ] Paid $5 developer fee
- [ ] Created privacy policy and hosted it
- [ ] Created promotional tile (440x280)
- [ ] Created at least 1 screenshot (1280x800)
- [ ] Tested extension locally
- [ ] Uploaded linkedin-name-extractor.zip
- [ ] Filled out all store listing information
- [ ] Filled out privacy practices
- [ ] Selected distribution settings
- [ ] Submitted for review

## Common Issues & Solutions

**Upload fails:**
- Check that manifest.json is valid JSON
- Ensure all referenced files (icons, scripts) exist in the zip
- Verify manifest_version is 3

**Review rejection - permissions:**
- Make sure you've justified all permissions in the Privacy tab
- Provide clear explanations of why each permission is needed

**Review rejection - functionality:**
- Extension must work as described
- Test thoroughly before submitting
- Provide clear screenshots showing features

## Updating Your Extension

To publish an update:
1. Modify your extension files
2. Increment the version number in manifest.json
3. Create a new zip file
4. In the Developer Dashboard, click your extension
5. Click "Package" tab → "Upload new package"
6. Upload the new zip
7. Submit for review

## Support & Resources

- **Chrome Web Store Documentation**: https://developer.chrome.com/docs/webstore/
- **Publishing Guide**: https://developer.chrome.com/docs/webstore/publish/
- **Developer Dashboard**: https://chrome.google.com/webstore/devconsole
- **Community Forum**: https://groups.google.com/a/chromium.org/g/chromium-extensions

## Contact

If you need help:
- Check the Developer Dashboard for review feedback
- Visit the Chrome Extensions Developer Forum
- Review Chrome's extension documentation

---

**Your packaged extension is ready**: `linkedin-name-extractor.zip` (6.5 KB)

Good luck with your Chrome Web Store submission! 🚀
