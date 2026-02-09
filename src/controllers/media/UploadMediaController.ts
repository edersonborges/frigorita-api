import { Request, Response } from 'express';
import { UploadMediaService } from '../../services/media/UploadMediaService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class UploadMediaController {
    private uploadMediaService: UploadMediaService;

    constructor(uploadMediaService: UploadMediaService) {
        this.uploadMediaService = uploadMediaService;
    }

    async handle(req: Request, res: Response) {
        try {
            const file = req.file;
            const type = req.body.type; // 'imagem' ou 'video'

            if (!file) {
                return res.status(400).json({ error: 'Erro ao receber mídia' });
            }

            if (!type || (type !== 'imagem' && type !== 'video')) {
                return res.status(400).json({ error: 'Tipo de mídia inválido' });
            }

            const result = await this.uploadMediaService.execute(file, type);

            const message = serializeBigInt(result);
            return res.json({ success: true, message });
        } catch (error) {
            console.error('Error in UploadMediaController:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export { UploadMediaController };
