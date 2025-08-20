import express from 'express';
import { 
  getCertificateById, 
  verifyCertificate,
  getUserCertificates
} from '../controllers/certificateController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:id', getCertificateById);
router.get('/verify/:id', verifyCertificate);
router.get('/user/all', protect, getUserCertificates);

export default router;