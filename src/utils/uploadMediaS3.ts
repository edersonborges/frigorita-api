import { S3Client, PutObjectCommand, ObjectCannedACL } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import { AWS_S3_BUCKET_NAME } from '../configs/config';

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'video/mp4', 'video/mpeg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, MP4 and MPEG are allowed.'));
    }
  }
});

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
});

class UploadService {
  async uploadFile(file: Express.Multer.File, type: 'imagem' | 'video'): Promise<any> {
    if (!file) {
      throw new Error('File not found');
    }

    // Remove espaços do nome do arquivo
    const sanitizedFileName = file.originalname.replace(/\s+/g, '_');

    const uploadParams = {
      Bucket: AWS_S3_BUCKET_NAME!,
      Key: `${uuidv4()}-${sanitizedFileName}`, // Usa o nome do arquivo sanitizado
      Body: file.buffer,
      ContentType: file.mimetype,
      // ACL: 'public-read' as ObjectCannedACL,
    };

    const command = new PutObjectCommand(uploadParams);

    try {
      await s3Client.send(command);
      const url = `https://${AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${uploadParams.Key}`;
      return { url: url, key: uploadParams.Key };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Error uploading file');
    }
  }
}

export { UploadService, upload };
