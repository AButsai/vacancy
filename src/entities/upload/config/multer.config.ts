import { BadRequestException } from '@nestjs/common';
import * as multer from 'multer';

export const multerOptions: multer.Options = {
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      throw new BadRequestException('Only image files are allowed!');
    }
    cb(null, true);
  },
};
