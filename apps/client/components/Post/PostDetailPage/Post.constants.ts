const postTransition = {
  duration: 0.4,
  delay: 0.25,
  ease: [0.42, 0, 0.58, 1]
};

const postVariants = {
  hidden: { y: 24, opacity: 0, postTransition },
  show: {
    y: 0,
    x: 0,
    opacity: 1,
    postTransition
  }
};

export default postVariants;
