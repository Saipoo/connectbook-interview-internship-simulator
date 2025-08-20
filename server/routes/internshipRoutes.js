import express from 'express';
import { 
  getInternships, 
  getInternshipById, 
  completeInternship,
  seedInternships
} from '../controllers/internshipController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getInternships);
router.get('/:id', getInternshipById);
router.post('/complete', protect, completeInternship);
router.post('/seed', seedInternships); // In production, this should be protected

export default router;