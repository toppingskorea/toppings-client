const env = {
  KAKAO_JAVASCRIPT_KEY: process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY,
  REDIRECT_URI: process.env.NEXT_PUBLIC_REDIRECT_URI,
  SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN
} as const;

export default env;
