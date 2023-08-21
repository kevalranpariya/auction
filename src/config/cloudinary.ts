import { v2 as cloudInary } from 'cloudinary';
import { config } from 'dotenv';
import { Request } from 'express';
import multer from 'multer';
config();

const { CLOUD_NAME, CLOUD_API_KEY,CLOUD_API_SECRET } = process.env;

cloudInary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET
});

const fileFilter = (req:Request, file:any, cb:any) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file format'), false);
  }
};

export const upload = multer({ storage: multer.diskStorage({}), fileFilter: fileFilter,limits: {
  fileSize: 1024*1024
}});

