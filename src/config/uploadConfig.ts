import { randomBytes } from 'crypto';
import multer from 'multer';
import { resolve } from 'path';

const uploadsFolderPath = resolve(__dirname, '..', '..', 'uploads');

export default {
  uploadsFolderPath,
  multer: {
    storage: multer.diskStorage({
      destination: uploadsFolderPath,
      filename(request, file, callback) {
        const hash = randomBytes(16).toString('hex');
        const filename = `${hash}-${file.originalname}`;

        callback(null, filename);
      },
    }),
  },
};
