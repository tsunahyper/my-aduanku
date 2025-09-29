import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, S3_BUCKET } = process.env;

// Fail fast if anything is missing
if (!AWS_REGION || !AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !S3_BUCKET) {
  throw new Error('S3 env not set: AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, S3_BUCKET are required');
}

AWS.config.update({
  region: AWS_REGION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

export const uploadToS3 = multer({
  storage: multerS3({
    s3,
    bucket: S3_BUCKET, // if this is undefined, you get "bucket is required"
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => cb(null, { fieldName: file.fieldname }),
    key: (req, file, cb) => {
      const ext = file.originalname.split('.').pop();
      cb(null, `uploads/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`);
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow images, videos, and documents
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'video/mp4',
      'video/avi',
      'video/mov',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images, videos, and documents are allowed.'), false);
    }
  }
});

// Delete file from S3
export const deleteFromS3 = async (key) => {
    try {
        const params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: key
        };
        
        await s3.deleteObject(params).promise();
        return true;
    } catch (error) {
        console.error('Error deleting file from S3:', error);
        return false;
    }
};

// Generate signed URL for private files
export const generateSignedUrl = async (key, expiresIn = 3600) => {
    try {
        const params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: key,
            Expires: expiresIn
        };
        
        return await s3.getSignedUrlPromise('getObject', params);
    } catch (error) {
        console.error('Error generating signed URL:', error);
        throw error;
    }
};
