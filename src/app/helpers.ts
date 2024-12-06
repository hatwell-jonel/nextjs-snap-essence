import { saveAs } from "file-saver";

// Function to determine file extension based on URL
const getFileExtension = (url: string) => {
  const ext = url.split('.').pop()?.toLowerCase();
  if (ext && ['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(ext)) {
    return ext;
  }
  return 'jpg'; // Default to jpg if the extension is unknown
};

export const downloadImage = (url: string) => {
  const fileExtension = getFileExtension(url); // Get file extension from the URL
  const fileName = `image.${fileExtension}`; // Generate a filename based on the extension

  saveAs(url, fileName); // Download the image with the correct filename
};
