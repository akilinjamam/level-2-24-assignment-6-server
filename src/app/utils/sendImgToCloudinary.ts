import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret_key,
});

const storage = new CloudinaryStorage({ cloudinary });

export const upload = multer({ storage: storage });
