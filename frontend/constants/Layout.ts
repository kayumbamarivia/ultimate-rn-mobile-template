import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const WINDOW_WIDTH = width;
export const WINDOW_HEIGHT = height;

// Commonly used multipliers
export const layout = {
  width,
  height,
  // Useful for responsive padding/margins
  spacingHorizontal: width * 0.05,
  spacingVertical: height * 0.02,
  
  // Useful for images and logos
  logoWidth: width * 0.4,
  logoHeight: 90,
  
  // Screen sections
  headerHeight: height * 0.1,
  footerHeight: height * 0.08,
  
  // Common dimension multipliers
  fullWidth: width,
  fullHeight: height,
  halfWidth: width * 0.5,
  halfHeight: height * 0.5,
  quarterWidth: width * 0.25,
  quarterHeight: height * 0.25
};