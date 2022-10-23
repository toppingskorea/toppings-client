declare module NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    DUMMY: string;
  }
}
