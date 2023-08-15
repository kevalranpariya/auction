import { v2 as cloudInary } from 'cloudinary';
import { Request } from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
export const cloudinary:any = cloudInary.config({
  cloud_name: 'dmqp7upjv',
  api_key: '499928582221999',
  api_secret: 'vMhAR7XI2OQM8UcIcfEBKNcyIbc'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudInary
});

const fileFilter = (req:Request, file:any, cb:any) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file format'), false);
  }
};

export const upload = multer({ storage: storage, fileFilter: fileFilter,limits: {
  fileSize: 1024*1024
}});

