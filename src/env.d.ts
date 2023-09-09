declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      AWS_SECRET_ACCESS_KEY_BACKUP: string;
      BUCKET_NAME: string;
      CORS_ORIGIN: string;
      REGION_CODE: string;
      PORT: string;
      PROFILE_PICTURES: string;
      DB_HOST: string;
      DB_USER: string;
      DB_PASS: string;
      DB_NAME: string;
      REDIS_PASSWORD: string;
      REDIS_URL: string;
      SECRET: string;
      TOKEN: string;
    }
  }
}

export {}
