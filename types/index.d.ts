declare global {
  namespace NodeJS {
    export interface processEnv {
      TELEGRAM_TOKEN?: string;
      LC_USERNAME?: string;
      GIST_TOKEN?: string;
      GIST_ID?: string;
      WB_RSS?: string;
    }
  }
}