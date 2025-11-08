import { getFileFromStorage } from '../config/supabase.js';

// Get manhwa list with pagination
export const getManhwaList = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Read metadata file from Supabase
    const metadata = await getFileFromStorage('metadata/metadata.json');

    const total = metadata.length;
    const paginatedData = metadata.slice(skip, skip + limit);

    res.json({
      success: true,
      data: paginatedData,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get latest manhwa
export const getLatestManhwa = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    // Read metadata file from Supabase
    const metadata = await getFileFromStorage('metadata/metadata.json');

    // Sort by last update and get latest
    const latest = metadata
      .sort((a, b) => new Date(b.lastUpdate) - new Date(a.lastUpdate))
      .slice(0, limit);

    res.json({
      success: true,
      data: latest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get manhwa detail by ID/slug
export const getManhwaDetail = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🔍 getManhwaDetail called with id: "${id}"`);
    console.log(`📍 Full URL: ${req.originalUrl}`);
    console.log(`📍 Params:`, req.params);

    // Validate ID - check if it's a placeholder
    if (!id || id === ':id' || id.startsWith(':')) {
      return res.status(400).json({
        success: false,
        error: 'Invalid manhwa ID',
        message: 'Please replace :id with actual manhwa slug',
        example: 'GET /api/manhwa/12321-academys-genius-swordmaster',
        hint: 'Use the slug from your Supabase file names (without .json extension)'
      });
    }

    // Try to read detail from Chapter/komiku/slug.json
    try {
      const detailData = await getFileFromStorage(`Chapter/komiku/${id}.json`);
      
      return res.json({
        success: true,
        data: detailData,
        source: 'detail_file'
      });
    } catch (detailError) {
      // If detail file not found, fallback to metadata
      console.log(`Detail file not found for ${id}, using metadata`);
      
      const metadata = await getFileFromStorage('metadata/metadata.json');
      const manhwa = metadata.find(item => item.id === id || item.title === id);

      if (!manhwa) {
        return res.status(404).json({
          success: false,
          error: 'Manhwa not found'
        });
      }

      res.json({
        success: true,
        data: manhwa,
        source: 'metadata'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
