import express from 'express';
import { getChaptersByManhwa, getChapterDetail } from '../controllers/chapterController.js';

const router = express.Router();

// GET /api/chapters/:manhwaId - Get all chapters for a manhwa
router.get('/:manhwaId', getChaptersByManhwa);

// GET /api/chapters/:manhwaId/:chapterId - Get chapter detail
router.get('/:manhwaId/:chapterId', getChapterDetail);

export default router;
