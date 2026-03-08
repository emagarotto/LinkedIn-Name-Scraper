#!/usr/bin/env python3
"""
Generate icons for LinkedIn Name Extractor Chrome Extension
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size, filename):
    """Create a simple icon with LinkedIn colors"""
    # LinkedIn blue color
    bg_color = (0, 115, 177)  # #0073B1
    
    # Create image with blue background
    img = Image.new('RGB', (size, size), bg_color)
    draw = ImageDraw.Draw(img)
    
    # Draw white circle in center (profile icon style)
    margin = size // 6
    circle_bbox = [margin, margin, size - margin, size - margin]
    draw.ellipse(circle_bbox, fill='white', outline='white')
    
    # Draw "LN" text for LinkedIn Name
    try:
        # Try to use system font
        font_size = size // 2
        try:
            font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size)
        except:
            try:
                font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", font_size)
            except:
                # Fallback to default font
                font = ImageFont.load_default()
    except:
        font = ImageFont.load_default()
    
    # Draw text in center
    text = "LN"
    
    # Get text bounding box for centering
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    # Position text in center
    x = (size - text_width) // 2
    y = (size - text_height) // 2 - bbox[1]
    
    draw.text((x, y), text, fill=bg_color, font=font)
    
    # Save image
    img.save(filename, 'PNG')
    print(f"✓ Created {filename} ({size}x{size})")

def main():
    """Generate all required icon sizes"""
    print("Generating LinkedIn Name Extractor icons...\n")
    
    sizes = [
        (16, 'icon16.png'),
        (48, 'icon48.png'),
        (128, 'icon128.png')
    ]
    
    for size, filename in sizes:
        create_icon(size, filename)
    
    print("\n✓ All icons generated successfully!")
    print("\nYou can now load the extension in Chrome.")

if __name__ == "__main__":
    main()
