declare module NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY: string;
    NEXT_PUBLIC_TOPPINGS_CLIENT_URL: string;
  }
}
