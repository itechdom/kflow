const sharp = require('sharp');
const fs = require('fs');

async function trimWhitespace(imagePath, outputPath) {
  try {
    await sharp(imagePath)
      .trim() // This is the key method for removing surrounding whitespace
      .toFile(outputPath);

    console.log(`Trimmed image saved to: ${outputPath}`);
  } catch (error) {
    console.error('Error trimming whitespace:', error);
  }
}

// Example usage:
const inputImage = 'path/to/your/image.jpg'; 
const outputImage = 'path/to/save/trimmed_image.jpg';

trimWhitespace(inputImage, outputImage);