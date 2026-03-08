# Icons Setup

The Chrome extension requires three icon sizes. You need to create these icon files:

- `icon16.png` - 16x16 pixels
- `icon48.png` - 48x48 pixels  
- `icon128.png` - 128x128 pixels

## How to Create Icons

### Option 1: Use an Online Tool
1. Visit a site like https://www.canva.com or https://www.figma.com
2. Create a simple design (e.g., LinkedIn logo with "LN" text or a profile icon)
3. Export in three sizes: 16x16, 48x48, and 128x128 pixels
4. Save them in this directory with the names above

### Option 2: Use a Placeholder
1. Create a simple colored square in any image editor
2. Add text like "LN" or "📎"
3. Resize to the three required sizes
4. Save in this directory

### Option 3: Quick Command Line (macOS)
If you have ImageMagick installed:

```bash
# Create a simple blue icon with "LN" text
convert -size 128x128 xc:#0073b1 -pointsize 72 -fill white -gravity center -annotate +0+0 "LN" icon128.png
convert icon128.png -resize 48x48 icon48.png
convert icon128.png -resize 16x16 icon16.png
```

## Temporary Workaround

Until you create proper icons, you can comment out the `icons` section in `manifest.json`:

```json
  // "icons": {
  //   "16": "icon16.png",
  //   "48": "icon48.png",
  //   "128": "icon128.png"
  // }
```

The extension will work without icons, but Chrome will show a default placeholder icon.
