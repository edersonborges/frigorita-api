import dotenv from 'dotenv';

dotenv.config();

export const EMAIL = process.env.EMAIL;
export const PSW_EMAIL = process.env.PSW_EMAIL;
export const EMAIL_PORT = process.env.EMAIL_PORT;
export const EMAIL_HOST = process.env.EMAIL_HOST;
export const DATABASE_URL = process.env.DATABASE_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
export const PORT = process.env.PORT;
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const AWS_REGION = process.env.AWS_REGION;
export const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
export const BASE_URL_EMAIL = process.env.BASE_URL_EMAIL;
export const REDIS_URL = process.env.REDIS_URL;