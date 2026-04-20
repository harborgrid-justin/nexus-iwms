export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
      NODE_ENV: string;
      [key: string]: string | undefined;
    }
  }
}
