const sharp = require('sharp');
const path = require('path');

async function addIconSpacing(inputSheet, outputSheet, spacing = 10) {
  try {
    const image = await sharp(inputSheet);
    const metadata = await image.metadata();

    // Extract icons
    const icons = [];
    const iconWidth = metadata.width / 3; // Assuming a 3xN icon sheet
    for (let i = 0; i < metadata.height; i += iconWidth + spacing) {
      for (let j = 0; j < metadata.width; j += iconWidth + spacing) {
        icons.push(image.extract({ left: j, top: i, width: iconWidth, height: iconWidth }));
      }
    }

    // Calculate dimensions for new sheet with spacing
    const iconsPerRow = Math.floor(metadata.width / (iconWidth + spacing));
    const rows = Math.ceil(icons.length / iconsPerRow);
    const newWidth = iconsPerRow * (iconWidth + spacing) - spacing; // Remove trailing space
    const newHeight = rows * (iconWidth + spacing) - spacing;

    // Create new sheet and composite icons
    const newSheet = await sharp({
      create: {
        width: newWidth,
        height: newHeight,
        channels: metadata.channels,
        background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background
      }
    });

    for (let i = 0; i < icons.length; i++) {
      const row = Math.floor(i / iconsPerRow);
      const col = i % iconsPerRow;
      newSheet.composite([{
        input: await icons[i].toBuffer(),
        left: col * (iconWidth + spacing),
        top: row * (iconWidth + spacing)
      }]);
    }

    await newSheet.toFile(outputSheet);
    console.log(`Processed icon sheet saved to: ${outputSheet}`);

  } catch (error) {
    console.error('Error processing icon sheet:', error);
  }
}

// Example usage:
const input = 'path/to/your/icon_sheet.png';
const output = 'path/to/save/spaced_icons.png';
addIconSpacing(input, output, 20); // Add 20px spacing