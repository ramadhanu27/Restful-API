import express from 'express';
import { getManhwaList, getManhwaDetail, getLatestManhwa } from '../controllers/manhwaController.js';

const router = express.Router();

// GET /api/manhwa/latest - Get latest manhwa (MUST be before /:id)
router.get('/latest', getLatestManhwa);

// GET /api/manhwa - Get all manhwa with pagination
router.get('/', getManhwaList);

// GET /api/manhwa/:id - Get manhwa detail by ID
router.get('/:id', getManhwaDetail);

export default router;
