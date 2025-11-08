import { getFileFromStorage } from '../config/supabase.js';

// Search manhwa by query
export const searchManhwa = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Query parameter "q" is required'
      });
    }

    // Read metadata file from Supabase
    const metadata = await getFileFromStorage('metadata/metadata.json');

    // Search by title, alternative title, or genres
    const query = q.toLowerCase();
    const results = metadata.filter(item => {
      const titleMatch = item.title?.toLowerCase().includes(query);
      const altTitleMatch = item.alternativeTitle?.toLowerCase().includes(query);
      const genreMatch = item.genres?.some(genre => genre.toLowerCase().includes(query));
      
      return titleMatch || altTitleMatch || genreMatch;
    });

    res.json({
      success: true,
      query: q,
      count: results.length,
      data: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
