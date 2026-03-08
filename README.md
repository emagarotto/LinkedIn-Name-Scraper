# LinkedIn Name Extractor

A Chrome extension that automatically extracts and inserts the first name of a LinkedIn user when you open a message box, plus adds a convenient attachment button.

## Features

- **Auto-insert Name**: Automatically detects the person's name from their LinkedIn profile and inserts "Hi, [FirstName] " into the message box
- **Attachment Button**: Adds a custom "📎 Attach File" button to LinkedIn message boxes for easy file attachment
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
   - You should see "LinkedIn Name Extractor" in your extensions list
   - The extension should be enabled (toggle is blue)

## Usage

### Name Insertion
1. Navigate to LinkedIn (https://www.linkedin.com)
2. Go to someone's profile or open a conversation in LinkedIn messages
3. Click on the message box to compose a message
4. The extension will automatically insert "Hi, [FirstName] " with the cursor positioned after it
5. Continue typing your message

### File Attachment
1. Look for the blue "📎 Attach File" button near the message box
2. Click the button to select a file from your computer
3. The extension will attempt to trigger LinkedIn's native attachment functionality
4. If native functionality isn't available, a file preview will be shown

## How It Works

The extension:
1. Monitors LinkedIn pages for profile names
2. Extracts the first name from the full name
3. Watches for when you focus on a message box
4. Automatically inserts a personalized greeting: "Hi, [FirstName] "
5. Adds a custom attachment button to message forms
6. Attempts to integrate with LinkedIn's native attachment system

## Features in Detail

### Greeting Format
The extension inserts: **"Hi, [FirstName] "**
- Example: "Hi, John " (with a space after the name for easy typing)

### Attachment Button
- Styled to match LinkedIn's design language
- Blue button with paperclip emoji
- File size preview
- Remove button for selected files
- Attempts to use LinkedIn's native attachment functionality when available

## Debugging

To see what the extension is doing:
1. Open Chrome DevTools (F12 or right-click → Inspect)
2. Go to the Console tab
3. Look for messages starting with "LinkedIn Name Extractor:"

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
- Files selected are not uploaded by the extension itself

## Troubleshooting

**The name isn't being inserted:**
- Make sure you're on a LinkedIn profile or messaging page
- Check the browser console for error messages
- Try refreshing the page
- Verify the extension is enabled in chrome://extensions/

**The attachment button doesn't appear:**
- Refresh the LinkedIn page
- Check if the message box is fully loaded
- Look in the console for any error messages

**Wrong name is being extracted:**
- LinkedIn's page structure may have changed
- Check the console logs to see what name was detected
- You may need to update the CSS selectors in content.js

## Development

To modify the extension:
1. Edit the files in this directory
2. Go to chrome://extensions/
3. Click the reload icon on the LinkedIn Name Extractor card
4. Refresh any LinkedIn pages you have open

## Files

- `manifest.json` - Extension configuration
- `content.js` - Main script that runs on LinkedIn pages
- `README.md` - This file

## Future Enhancements

- Custom greeting templates
- Support for different languages
- Better integration with LinkedIn's attachment API
- Settings panel for customization

## License

MIT
