export const encodeFileToBase64 = (image: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (event: ProgressEvent<FileReader>) =>
      resolve(event?.target?.result);
    reader.onerror = error => reject(error);
  });
