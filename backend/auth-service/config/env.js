import { config } from 'dotenv';

// Load environment variables from multiple sources
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
config({ path: '.env.local' });
config({ path: '.env' });

export const { 
    PORT, 
    NODE_ENV, 
    DB_URI, 
    JWT_SECRET, 
    JWT_EXPIRES_IN, 
    JWT_REFRESH_SECRET, 
    JWT_REFRESH_EXPIRES_IN, 
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_REGION,
    AWS_S3_BUCKET
} = process.env
