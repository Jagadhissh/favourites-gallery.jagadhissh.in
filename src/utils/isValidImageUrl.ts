const isValidImageURL = (imageUrl: string) => {
  try {
    new URL(imageUrl);
    const possibleImageExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".bmp",
      ".webp",
      ".svg",
    ];
    return possibleImageExtensions.some((ext) => imageUrl.endsWith(ext));
  } catch (error) {
    return false;
  }
};
export default isValidImageURL;
