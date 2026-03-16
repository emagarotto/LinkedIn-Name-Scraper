#!/usr/bin/env node

/**
 * Automated icon generator for LinkedIn Message Helper
 * Run with: node auto_generate_icons.js
 */

const fs = require('fs');

// Create hamburger SVG icons
function createSVGIcon(size) {
    const padding = Math.round(size * 0.22);  // outer padding
    const barHeight = Math.max(1, Math.round(size * 0.10)); // thickness of each bar
    const gap = Math.round((size - 2 * padding - 3 * barHeight) / 2); // space between bars
    const barWidth = size - 2 * padding;
    const x = padding;
    const y1 = padding;
    const y2 = y1 + barHeight + gap;
    const y3 = y2 + barHeight + gap;
    const radius = Math.round(size * 0.12); // rounded corners on background

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <!-- LinkedIn blue rounded background -->
  <rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="#0073b1"/>
  <!-- Hamburger bars -->
  <rect x="${x}" y="${y1}" width="${barWidth}" height="${barHeight}" rx="${Math.round(barHeight/2)}" fill="white"/>
  <rect x="${x}" y="${y2}" width="${barWidth}" height="${barHeight}" rx="${Math.round(barHeight/2)}" fill="white"/>
  <rect x="${x}" y="${y3}" width="${barWidth}" height="${barHeight}" rx="${Math.round(barHeight/2)}" fill="white"/>
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
