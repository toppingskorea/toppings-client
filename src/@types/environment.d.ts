declare module NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NEXT_PUBLIC_SENTRY_DSN: string;
    NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY: string;
    NEXT_PUBLIC_REDIRECT_URI: string;
  }
}
