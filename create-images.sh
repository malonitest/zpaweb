#!/bin/bash

# Script to generate placeholder images for AutoZástava24
# These are SVG-based images that will be converted to PNG

echo "Creating images for AutoZástava24..."

# Create images directory
mkdir -p /workspaces/zpaweb/images

# 1. Create Logo (512x512 PNG)
cat > /workspaces/zpaweb/logo.png.svg << 'EOF'
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#1e40af"/>
  <circle cx="256" cy="200" r="100" fill="#ffffff" opacity="0.9"/>
  <rect x="180" y="260" width="152" height="80" rx="10" fill="#ffffff" opacity="0.9"/>
  <text x="256" y="350" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="#ffffff" text-anchor="middle">AUTO</text>
  <text x="256" y="410" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="#86efac" text-anchor="middle">ZÁSTAVA24</text>
  <path d="M220 180 L240 160 L340 160 L360 180 L350 240 L230 240 Z" fill="#1e40af"/>
  <circle cx="240" cy="225" r="12" fill="#1e40af"/>
  <circle cx="340" cy="225" r="12" fill="#1e40af"/>
</svg>
EOF

# 2. Create OG Image (1200x630 PNG) for social media
cat > /workspaces/zpaweb/og-image.jpg.svg << 'EOF'
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e40af;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#grad)"/>
  
  <!-- Car illustration -->
  <path d="M300 280 L350 260 L750 260 L800 280 L780 380 L320 380 Z" fill="white" opacity="0.3"/>
  <circle cx="380" cy="360" r="30" fill="white" opacity="0.4"/>
  <circle cx="720" cy="360" r="30" fill="white" opacity="0.4"/>
  <rect x="400" y="270" width="300" height="90" fill="white" opacity="0.2"/>
  
  <!-- 24h badge -->
  <circle cx="900" cy="250" r="80" fill="white" opacity="0.9"/>
  <text x="900" y="270" font-family="Arial, sans-serif" font-size="60" font-weight="bold" fill="#1e40af" text-anchor="middle">24h</text>
  
  <!-- Main text -->
  <text x="600" y="180" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="white" text-anchor="middle">AutoZástava24</text>
  
  <text x="600" y="470" font-family="Arial, sans-serif" font-size="48" font-weight="600" fill="#dbeafe" text-anchor="middle">Půjčka pod zástavu auta</text>
  <text x="600" y="530" font-family="Arial, sans-serif" font-size="40" fill="#86efac" text-anchor="middle">Peníze do 24 hodin • Praha</text>
</svg>
EOF

# 3. Create Favicon (32x32 PNG)
cat > /workspaces/zpaweb/favicon.png.svg << 'EOF'
<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" fill="#1e40af"/>
  <path d="M8 14 L10 12 L22 12 L24 14 L23 20 L9 20 Z" fill="white"/>
  <circle cx="11" cy="19" r="2" fill="#1e40af"/>
  <circle cx="21" cy="19" r="2" fill="#1e40af"/>
</svg>
EOF

# 4. Create Apple Touch Icon (180x180 PNG)
cat > /workspaces/zpaweb/apple-touch-icon.png.svg << 'EOF'
<svg width="180" height="180" xmlns="http://www.w3.org/2000/svg">
  <rect width="180" height="180" fill="#1e40af" rx="20"/>
  <circle cx="90" cy="70" r="35" fill="#ffffff" opacity="0.9"/>
  <rect x="65" y="95" width="50" height="28" rx="4" fill="#ffffff" opacity="0.9"/>
  <text x="90" y="140" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">AUTO</text>
  <text x="90" y="160" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#86efac" text-anchor="middle">24</text>
  <path d="M70 65 L75 60 L105 60 L110 65 L107 85 L73 85 Z" fill="#1e40af"/>
  <circle cx="77" cy="80" r="4" fill="#1e40af"/>
  <circle cx="103" cy="80" r="4" fill="#1e40af"/>
</svg>
EOF

# 5. Create PWA Icons (72, 96, 128, 144, 152, 192, 384, 512)
for size in 72 96 128 144 152 192 384 512; do
  cat > /workspaces/zpaweb/icon-${size}x${size}.png.svg << EOF
<svg width="$size" height="$size" xmlns="http://www.w3.org/2000/svg">
  <rect width="$size" height="$size" fill="#1e40af" rx="$(($size/10))"/>
  <circle cx="$(($size/2))" cy="$(($size*2/5))" r="$(($size/5))" fill="#ffffff" opacity="0.9"/>
  <rect x="$(($size*3/10))" y="$(($size/2))" width="$(($size*2/5))" height="$(($size/5))" rx="$(($size/20))" fill="#ffffff" opacity="0.9"/>
  <text x="$(($size/2))" y="$(($size*3/4))" font-family="Arial, sans-serif" font-size="$(($size/8))" font-weight="bold" fill="#ffffff" text-anchor="middle">24h</text>
  <path d="M $(($size*2/5)) $(($size*7/20)) L $(($size*9/20)) $(($size*3/10)) L $(($size*11/20)) $(($size*3/10)) L $(($size*3/5)) $(($size*7/20)) L $(($size*19/32)) $(($size/2)) L $(($size*13/32)) $(($size/2)) Z" fill="#1e40af"/>
  <circle cx="$(($size*7/16))" cy="$(($size*15/32))" r="$(($size/32))" fill="#1e40af"/>
  <circle cx="$(($size*9/16))" cy="$(($size*15/32))" r="$(($size/32))" fill="#1e40af"/>
</svg>
EOF
done

echo "SVG templates created. Now converting to PNG using ImageMagick..."

# Check if ImageMagick is installed
if command -v convert &> /dev/null; then
    echo "ImageMagick found. Converting SVGs to PNG..."
    
    # Convert logo
    convert /workspaces/zpaweb/logo.png.svg /workspaces/zpaweb/logo.png
    rm /workspaces/zpaweb/logo.png.svg
    
    # Convert OG image (save as JPG for smaller size)
    convert /workspaces/zpaweb/og-image.jpg.svg /workspaces/zpaweb/og-image.jpg
    rm /workspaces/zpaweb/og-image.jpg.svg
    
    # Convert favicon
    convert /workspaces/zpaweb/favicon.png.svg /workspaces/zpaweb/favicon.png
    rm /workspaces/zpaweb/favicon.png.svg
    
    # Convert apple touch icon
    convert /workspaces/zpaweb/apple-touch-icon.png.svg /workspaces/zpaweb/apple-touch-icon.png
    rm /workspaces/zpaweb/apple-touch-icon.png.svg
    
    # Convert PWA icons
    for size in 72 96 128 144 152 192 384 512; do
        convert /workspaces/zpaweb/icon-${size}x${size}.png.svg /workspaces/zpaweb/icon-${size}x${size}.png
        rm /workspaces/zpaweb/icon-${size}x${size}.png.svg
    done
    
    echo "✅ All images converted successfully!"
    ls -lh /workspaces/zpaweb/*.png /workspaces/zpaweb/*.jpg
else
    echo "⚠️  ImageMagick not found. Installing..."
    
    # Try to install ImageMagick
    if command -v apt-get &> /dev/null; then
        sudo apt-get update && sudo apt-get install -y imagemagick
    elif command -v yum &> /dev/null; then
        sudo yum install -y ImageMagick
    else
        echo "❌ Cannot install ImageMagick automatically."
        echo "Please install it manually: apt-get install imagemagick"
        echo ""
        echo "Alternative: Use online SVG to PNG converter for the .svg files created"
        exit 1
    fi
    
    # Try conversion again
    if command -v convert &> /dev/null; then
        echo "ImageMagick installed successfully. Converting..."
        bash "$0"  # Re-run this script
    fi
fi

echo ""
echo "✅ Image generation complete!"
echo ""
echo "Files created:"
echo "  - logo.png (512x512)"
echo "  - og-image.jpg (1200x630) - for social media"
echo "  - favicon.png (32x32)"
echo "  - apple-touch-icon.png (180x180)"
echo "  - icon-{72,96,128,144,152,192,384,512}x{size}.png - PWA icons"
echo ""
echo "Next steps:"
echo "1. Replace these placeholder images with your actual brand designs"
echo "2. Commit and push to deploy"
