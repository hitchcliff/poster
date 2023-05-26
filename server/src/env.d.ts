declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      BUCKET_NAME: string;
      REGION_CODE: string;
      PROFILE_PICTURES: string;
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      AWS_SECRET_ACCESS_KEY_BACKUP: string;
      DATABASE_URL: string;
      REDIS_URL: string;
      PORT: string;
      SECRET: string;
    }
  }
}

export {}
