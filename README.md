# LinkedIn Message Helper

A Chrome extension that automatically extracts and inserts the first name of a LinkedIn user when you open a message box, plus adds a convenient attachment button.

## Features

- **Auto-insert Name**: Automatically detects the person's name from their LinkedIn profile and inserts it into your custom message template
- **Custom Message Templates**: Create personalized message templates with the {name} placeholder - add multi-line intros, custom greetings, and more
- **Settings Panel**: Easy-to-use popup interface for customizing your message template
- **Smart Detection**: Works on LinkedIn messaging interface and profile pages
- **Non-intrusive**: Only inserts greeting when the message box is empty

## Installation

1. **Download or Clone** this repository to your local machine

2. **Open Chrome Extensions Page**
   - Open Chrome and navigate to `chrome://extensions/`
   - Or click the three dots menu → More Tools → Extensions

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top right corner

4. **Load the Extension**
   - Click "Load unpacked"
   - Navigate to the `linkedin-name-extension` folder
   - Click "Select Folder"

5. **Verify Installation**
   - You should see "LinkedIn Message Helper" in your extensions list
   - The extension should be enabled (toggle is blue)

## Usage

### Customize Your Message Template
1. Click the extension icon in your Chrome toolbar
2. Enter your custom message template using `{name}` as a placeholder
3. Examples:
   - Simple: `Hi, {name} `
   - With intro: `Hi, {name}\n\nI hope this message finds you well! `
   - Professional: `Hello {name},\n\nI came across your profile and wanted to reach out. `
4. Click "Save Settings"

### Name Insertion
1. Navigate to LinkedIn (https://www.linkedin.com)
2. Go to someone's profile or open a conversation in LinkedIn messages
3. Click on the message box to compose a message
4. The extension will automatically insert your custom message with the person's first name
5. Continue typing your message

## How It Works

The extension:
1. Monitors LinkedIn pages for profile names
2. Extracts the first name from the full name
3. Watches for when you focus on a message box
4. Automatically inserts a personalized greeting using your custom template

## Features in Detail

### Custom Message Templates
The extension uses customizable message templates with `{name}` placeholder:
- **Default**: `Hi, {name} ` → "Hi, John "
- **With spacing**: `Hi, {name}\n\nI hope...` → "Hi, John\n\nI hope..."
- **Multi-line**: Full professional introductions with line breaks
- **Real-time preview**: See how your message will look before saving

## Debugging

To see what the extension is doing:
1. Open Chrome DevTools (F12 or right-click → Inspect)
2. Go to the Console tab
3. Look for messages starting with "LinkedIn Message Helper:"

## Notes

- The extension only works on linkedin.com
- It only inserts text into empty message boxes to avoid overwriting your existing text
- LinkedIn's DOM structure may change over time; if the extension stops working, the selectors may need to be updated
- The attachment feature attempts to integrate with LinkedIn's native attachment system

## Privacy

This extension:
- Only runs on LinkedIn pages
- Does not collect or transmit any data
- Does not store any information
- All processing happens locally in your browser

## Troubleshooting

**The name isn't being inserted:**
- Make sure you're on a LinkedIn profile or messaging page
- Check the browser console for error messages
- Try refreshing the page
- Verify the extension is enabled in chrome://extensions/

**Wrong name is being extracted:
- LinkedIn's page structure may have changed
- Check the console logs to see what name was detected
- You may need to update the CSS selectors in content.js

## Development

To modify the extension:
1. Edit the files in this directory
2. Go to chrome://extensions/
3. Click the reload icon on the LinkedIn Message Helper card
4. Refresh any LinkedIn pages you have open

## Files

- `manifest.json` - Extension configuration
- `content.js` - Main script that runs on LinkedIn pages
- `popup.html` - Settings interface
- `popup.js` - Settings logic
- `popup.css` - Settings styling
- `README.md` - This file

## Future Enhancements

- ✅ Custom greeting templates (Added in v1.1.0!)
- ✅ Settings panel for customization (Added in v1.1.0!)
- Support for different languages
- Better integration with LinkedIn's attachment API
- Multiple saved templates
- Template variables (company, position, etc.)

## License

MIT
