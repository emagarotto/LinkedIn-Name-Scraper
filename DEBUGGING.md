# Debugging Guide - LinkedIn Name Extractor

If the extension isn't working, follow these steps to diagnose the issue.

## Quick Checks

### 1. Verify Extension is Loaded
1. Go to `chrome://extensions/`
2. Find "LinkedIn Name Extractor"
3. Ensure it's **enabled** (toggle is blue)
4. Check version is 1.1.0 or higher
5. Click **"Reload"** button (circular arrow icon)

### 2. Check Console Logs
1. Open LinkedIn
2. Press **F12** or right-click → **Inspect**
3. Click **Console** tab
4. Look for messages starting with "LinkedIn Name Extractor:"
5. You should see:
   - `"LinkedIn Name Extractor: Extension loaded"`
   - `"LinkedIn Name Extractor: Loaded template: ..."`
   - `"LinkedIn Name Extractor: Observer started"`

### 3. Test Name Detection
Open the Console (F12) and run:
```javascript
// Test if the extension can find the name
document.querySelector('h2.msg-entity-lockup__entity-title')?.textContent ||
document.querySelector('h1.text-heading-xlarge')?.textContent ||
document.querySelector('.msg-thread__link-to-profile')?.textContent ||
'Name not found'
```

This will show you if LinkedIn has the name element on the page.

## Common Issues & Solutions

### Issue 1: "Could not find profile name"

**Cause**: LinkedIn changed their HTML structure or you're on a page without a profile name.

**Solutions**:
1. Make sure you're on one of these pages:
   - Someone's profile page
   - LinkedIn messaging page with an active conversation
   - InMail page

2. Update the selectors - Open Console and find the name element:
```javascript
// Find all headings on the page
document.querySelectorAll('h1, h2, h3').forEach(el => {
    if (el.textContent.includes('YOUR_NAME_HERE')) {
        console.log('Found at:', el.className, el);
    }
});
```

3. Once you find the correct selector, you can update `content.js` line 19-30 with new selectors.

### Issue 2: Message box not receiving text

**Cause**: LinkedIn changed their message box structure.

**Test**:
```javascript
// Find message boxes
document.querySelectorAll('[contenteditable="true"]').forEach(el => {
    console.log('Message box found:', el.className, el);
});
```

**Solution**: Update selectors in `content.js` line 122-131.

### Issue 3: Extension loads but nothing happens

**Steps**:
1. Reload the extension in `chrome://extensions/`
2. Refresh LinkedIn page
3. Open Console (F12) - check for errors
4. Try clicking in the message box multiple times
5. Check if the `nameInserted` flag is blocking: Run in Console:
```javascript
document.querySelectorAll('[contenteditable="true"]').forEach(el => {
    delete el.dataset.nameInserted;
    console.log('Reset flag on:', el);
});
```

### Issue 4: Custom template not saving

**Check**:
1. Click extension icon - does popup open?
2. Enter template and click "Save Settings"
3. Do you see "✓ Settings saved successfully!"?
4. Check storage in Console:
```javascript
chrome.storage.sync.get(['messageTemplate'], (result) => {
    console.log('Stored template:', result.messageTemplate);
});
```

## LinkedIn Selector Updates (March 2026)

If LinkedIn has updated their structure, here are common current selectors:

### For Profile Names:
- Messaging: `h2.msg-entity-lockup__entity-title`
- Profile page: `h1.text-heading-xlarge` or `h1.inline`
- Conversation header: `.msg-thread__link-to-profile`
- Modern profile: `.pv-top-card--list h1`

### For Message Boxes:
- Main compose: `.msg-form__contenteditable`
- Quick reply: `.msg-s-message-group__message-field`
- Alternative: `[contenteditable="true"][role="textbox"]`

## Manual Testing Script

Run this in the Console to test the full flow:
```javascript
// Test extraction
const selectors = [
    'h2.msg-entity-lockup__entity-title',
    'h1.text-heading-xlarge',
    '.msg-thread__link-to-profile',
    'h1.inline',
    '.pv-top-card--list h1'
];

console.log('=== Testing Name Extraction ===');
for (const selector of selectors) {
    const el = document.querySelector(selector);
    if (el && el.textContent.trim()) {
        console.log('✓ Found with:', selector);
        console.log('  Name:', el.textContent.trim());
        console.log('  First name:', el.textContent.trim().split(/\s+/)[0]);
        break;
    } else {
        console.log('✗ Not found:', selector);
    }
}

console.log('\n=== Testing Message Boxes ===');
const boxSelectors = [
    '.msg-form__contenteditable[contenteditable="true"]',
    '[contenteditable="true"][role="textbox"]',
    'textarea.msg-form__textarea'
];

for (const selector of boxSelectors) {
    const boxes = document.querySelectorAll(selector);
    if (boxes.length > 0) {
        console.log('✓ Found', boxes.length, 'box(es) with:', selector);
    } else {
        console.log('✗ Not found:', selector);
    }
}
```

## Getting Help

If you're still having issues:
1. Run the manual testing script above
2. Copy the Console output
3. Open an issue at: https://github.com/emagarotto/LinkedIn-Name-Scraper/issues
4. Include:
   - Console output
   - Chrome version
   - What page you're on (profile, messaging, etc.)
   - Screenshot if possible

## Quick Fix: Force Reload

Sometimes Chrome caches the extension. To fully reload:
1. `chrome://extensions/` → Remove extension
2. Close all LinkedIn tabs
3. Close Chrome completely
4. Reopen Chrome
5. Load extension again (`chrome://extensions/` → Load unpacked)
6. Open LinkedIn in a new tab
