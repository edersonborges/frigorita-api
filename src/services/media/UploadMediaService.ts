import { UploadService } from '../../utils/uploadMediaS3';

class UploadMediaService {
    private uploadService = new UploadService();

    async execute(file: Express.Multer.File, type: 'imagem' | 'video'): Promise<Object> {
        console.log('uploading file')
        try {
            const url = await this.uploadService.uploadFile(file, type);
            return { url };
            
        } catch (error) {
            console.error('Error in UploadMediaService:', error);
            return 'Failed to upload media';
        }
    }
}

export { UploadMediaService };
