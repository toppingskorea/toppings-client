const env = {
  KAKAO_JAVASCRIPT_KEY: process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY,
  TOPPINGS_CLIENT_URL: process.env.NEXT_PUBLIC_TOPPINGS_CLIENT_URL
} as const;

export default env;
