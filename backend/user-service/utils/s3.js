import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { v4 as uuidv4 } from 'uuid';

// Configure AWS S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'us-east-1'
});

// Configure multer for S3 uploads
export const uploadToS3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET,
        acl: 'public-read',
        key: function (req, file, cb) {
            const fileExtension = file.originalname.split('.').pop();
            const fileName = `${uuidv4()}.${fileExtension}`;
            cb(null, `uploads/${Date.now()}-${fileName}`);
        },
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        }
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
