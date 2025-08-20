import express from 'express';
import { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  updateUserProfile,
  enrollCourse,
  updateCourseProgress,
  saveInterviewResults
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.post('/enroll', protect, enrollCourse);
router.put('/progress', protect, updateCourseProgress);
router.post('/interview', protect, saveInterviewResults);

export default router;