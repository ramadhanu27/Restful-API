import express from 'express';
import { searchManhwa } from '../controllers/searchController.js';

const router = express.Router();

// GET /api/search?q=query - Search manhwa
router.get('/', searchManhwa);

export default router;
