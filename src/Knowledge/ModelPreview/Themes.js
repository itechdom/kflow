// Light Mode
const theme1Light = {
  background: "linear-gradient(to top, #D2B48C 0%, #F4F1EA 100%)", // Tan to Cream
  baseStyle: { fill: "#F4F1EA", stroke: "#5D4037" }, // Cream with Dark Brown Outline
  textColor: "#5D4037", // Dark Brown
  nodeStyles: {
    blueNode: { fill: "#4CAF50" }, // Green
    orangeNode: { fill: "#FF9800" }, // Orange
    greyNode: { fill: "#795548" }, // Brown
    customNode: { fill: "#607D8B" }, // Blue Gray
  },
};

// Dark Mode
const theme1Dark = {
  background: "linear-gradient(to top, #3E2723 0%, #212121 100%)", // Dark Brown to Black
  baseStyle: { fill: "#212121", stroke: "#D2B48C" }, // Black with Tan Outline
  textColor: "#D2B48C", // Tan
  nodeStyles: {
    blueNode: { fill: "#1B5E20" }, // Dark Green
    orangeNode: { fill: "#E65100" }, // Dark Orange
    greyNode: { fill: "#4E342E" }, // Darker Brown
    customNode: { fill: "#263238" }, // Dark Gray
  },
};

// Light Mode
const theme2Light = {
  background: "linear-gradient(to top, #B2EBF2 0%, #E0F7FA 100%)", // Light Blue to Lighter Blue
  baseStyle: { fill: "#E0F7FA", stroke: "#01579B" }, // Light Blue with Dark Blue Outline
  textColor: "#01579B", // Dark Blue
  nodeStyles: {
    blueNode: { fill: "#2196F3" }, // Blue
    orangeNode: { fill: "#FF9800" }, // Orange
    greyNode: { fill: "#90A4AE" }, // Blue Gray
    customNode: { fill: "#64B5F6" }, // Lighter Blue
  },
};

// Dark Mode
const theme2Dark = {
  background: "linear-gradient(to top, #01579B 0%, #1A237E 100%)", // Dark Blue to Darker Blue
  baseStyle: { fill: "#1A237E", stroke: "#B2EBF2" }, // Darker Blue with Light Blue Outline
  textColor: "#B2EBF2", // Light Blue
  nodeStyles: {
    blueNode: { fill: "#0277BD" }, // Darker Blue
    orangeNode: { fill: "#F57C00" }, // Dark Orange
    greyNode: { fill: "#455A64" }, // Dark Gray
    customNode: { fill: "#03A9F4" }, // Light Blue
  },
};

// Light Mode
const theme3Light = {
  background: "linear-gradient(to top, #B2EBF2 0%, #E0F7FA 100%)", // Soft Blue to Lighter Blue
  baseStyle: { fill: "#E0F7FA", stroke: "#01579B" }, // Lighter Blue with Dark Blue Outline
  textColor: "#01579B", // Dark Blue
  nodeStyles: {
    blueNode: { fill: "#2196F3" }, // Blue
    orangeNode: { fill: "#FF9800" }, // Orange
    greyNode: { fill: "#90A4AE" }, // Blue Gray
    customNode: { fill: "#64B5F6" }, // Lighter Blue
  },
};

// Dark Mode
const theme3Dark = {
  background: "linear-gradient(to top, #212121 0%, #424242 100%)", // Dark Gray to Lighter Dark Gray
  baseStyle: { fill: "#424242", stroke: "#EEEEEE" }, // Lighter Dark Gray with Light Gray Outline
  textColor: "#EEEEEE", // Light Gray
  nodeStyles: {
    blueNode: { fill: "#616161" }, // Lighter Dark Gray
    orangeNode: { fill: "#303030" }, // Darker Dark Gray
    greyNode: { fill: "#111111" }, // Black
    customNode: { fill: "#757575" }, // Dark Gray
  },
};

export {
  theme1Light,
  theme1Dark,
  theme2Light,
  theme2Dark,
  theme3Light,
  theme3Dark,
};
