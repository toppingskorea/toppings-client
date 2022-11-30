declare module NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NEXT_PUBLIC_SENTRY_DSN: string;
    NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY: string;
    NEXT_PUBLIC_REDIRECT_URI: string;
    NEXT_PUBLIC_TOPPINGS_TOKEN_KEY: string;
    NEXT_PUBLIC_TOPPINGS_SERVER_URL: string;
    NEXT_PUBLIC_REDIRECT_URI: string;
    NEXT_PUBLIC_JWT_SECRET_KEY: string;
    NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID: string;
  }
}
