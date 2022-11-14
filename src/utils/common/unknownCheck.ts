const unknownCheck = (value: never) => {
  throw new Error(`You don't handle all condition ${value}`);
};

export default unknownCheck;
