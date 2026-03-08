#!/usr/bin/env node

/**
 * Automated icon generator for LinkedIn Name Extractor
 * Run with: node auto_generate_icons.js
 */

const fs = require('fs');

// Create SVG icons that can be converted
function createSVGIcon(size) {
    const margin = size / 6;
    const radius = (size - 2 * margin) / 2;
    const centerX = size / 2;
    const centerY = size / 2;
    const fontSize = size * 0.35;
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <!-- LinkedIn blue background -->
  <rect width="${size}" height="${size}" fill="#0073b1"/>
  
  <!-- White circle -->
  <circle cx="${centerX}" cy="${centerY}" r="${radius}" fill="white"/>
  
  <!-- LN text -->
  <text x="${centerX}" y="${centerY}" 
        font-family="Arial, sans-serif" 
        font-size="${fontSize}" 
        font-weight="bold" 
        fill="#0073b1" 
        text-anchor="middle" 
        dominant-baseline="central">LN</text>
</svg>`;
}

// Generate all three icon sizes as SVG
const sizes = [16, 48, 128];

console.log('Generating icon SVG files...\n');

sizes.forEach(size => {
    const svg = createSVGIcon(size);
    const filename = `icon${size}.svg`;
    fs.writeFileSync(filename, svg);
    console.log(`✓ Created ${filename}`);
});

console.log('\n✓ SVG icons generated!');
console.log('\nTo convert to PNG:');
console.log('1. Open each SVG in Preview (double-click)');
console.log('2. File > Export > Format: PNG');
console.log('3. Save as icon16.png, icon48.png, icon128.png');
console.log('\nOr use the HTML file to download PNGs directly!');
