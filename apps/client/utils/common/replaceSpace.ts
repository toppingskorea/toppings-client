const replaceSpace = <T>(text: string) => {
  return text.replaceAll(" ", "") as T;
};

export default replaceSpace;
