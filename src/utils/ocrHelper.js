import Tesseract from 'tesseract.js';

export const extractTextFromImage = async (imageFile) => {
  try {
    const result = await Tesseract.recognize(imageFile, 'eng');
    const extractedText = result.data.text;
    const words = extractedText.match(/\b\w+\b/g)?.filter(w => w.length > 3) || [];
    return words;
  } catch (error) {
    console.error('OCR failed:', error);
    return [];
  }
};