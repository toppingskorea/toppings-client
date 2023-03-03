// 용량을 줄이기 위한 유틸입니다.

/**
 * Resize a base 64 Image
 * @param {String} base64 - The base64 string (must include MIME type)
 * @param {Number} MAX_WIDTH - The width of the image in pixels
 * @param {Number} MAX_HEIGHT - The height of the image in pixels
 */

export const resizeBase64Img = async (
  base64Str: string,
  MAX_WIDTH = 450,
  MAX_HEIGHT = 450
) => {
  const resizedBase64 = await new Promise(resolve => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let { width } = img;
      let { height } = img;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else if (height > MAX_HEIGHT) {
        width *= MAX_HEIGHT / height;
        height = MAX_HEIGHT;
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL()); // this will return base64 image results after resize
    };
  });
  return resizedBase64;
};
