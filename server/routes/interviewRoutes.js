import express from 'express';
import { 
  getInterviewRoles, 
  getInterviewQuestions,
  seedInterviewData
} from '../controllers/interviewController.js';

const router = express.Router();

router.get('/roles', getInterviewRoles);
router.get('/questions/:roleId', getInterviewQuestions);
router.post('/seed', seedInterviewData); // In production, this should be protected

export default router;