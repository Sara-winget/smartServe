import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    let folder = 'smartserve/users/others';
    let formats = ['jpg', 'jpeg', 'png', 'pdf'];

    if (file.fieldname === 'profilePic') {
      folder = 'smartserve/users/profilePics';
      formats = ['jpg', 'jpeg', 'png'];
    }
    if (file.fieldname === 'resume') {
      folder = 'smartserve/users/resumes';
      formats = ['pdf'];
    }
    if (file.fieldname === 'identityProof') {
      folder = 'smartserve/users/identityProofs';
      formats = ['jpg', 'jpeg', 'png', 'pdf'];
    }

    return {
      folder,
      allowed_formats: formats,
      public_id: `${Date.now()}_${file.originalname}`
    };
  }
});

export const uploadFields = multer({ storage }).fields([
  { name: 'profilePic', maxCount: 1 },
  { name: 'resume', maxCount: 1 },
  { name: 'identityProof', maxCount: 1 }
]);
