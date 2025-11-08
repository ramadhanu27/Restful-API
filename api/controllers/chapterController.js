import { getFileFromStorage } from '../config/supabase.js';

// Get all chapters for a manhwa
export const getChaptersByManhwa = async (req, res) => {
  try {
    const { manhwaId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    // Try to read manhwa detail file which contains chapters
    try {
      const manhwaDetail = await getFileFromStorage(`Chapter/komiku/${manhwaId}.json`);
      
      // Extract chapters from detail file
      const chapters = manhwaDetail.chapters || manhwaDetail.chapterList || [];
      
      const total = chapters.length;
      const paginatedData = chapters.slice(skip, skip + limit);

      return res.json({
        success: true,
        data: paginatedData,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        },
        source: 'detail_file'
      });
    } catch (error) {
      // If detail file not found, try chapter-updates.json
      try {
        const chapters = await getFileFromStorage('data/chapter-updates.json');
        const manhwaChapters = chapters.filter(ch => 
          ch.manhwaId === manhwaId || ch.title?.includes(manhwaId)
        );

        const total = manhwaChapters.length;
        const paginatedData = manhwaChapters.slice(skip, skip + limit);

        return res.json({
          success: true,
          data: paginatedData,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
          },
          source: 'chapter_updates'
        });
      } catch (err) {
        // Return empty array if no data found
        return res.json({
          success: true,
          data: [],
          pagination: {
            page,
            limit,
            total: 0,
            totalPages: 0
          },
          message: 'No chapters found'
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get chapter detail
export const getChapterDetail = async (req, res) => {
  try {
    const { manhwaId, chapterId } = req.params;

    // First, try to get manhwa detail which contains all chapters
    try {
      const manhwaDetail = await getFileFromStorage(`Chapter/komiku/${manhwaId}.json`);
      
      // Find specific chapter in the chapters array
      const chapters = manhwaDetail.chapters || manhwaDetail.chapterList || [];
      const chapter = chapters.find(ch => 
        ch.id === chapterId || 
        ch.chapterId === chapterId ||
        ch.slug === chapterId ||
        ch.number === chapterId
      );

      if (chapter) {
        return res.json({
          success: true,
          data: {
            ...chapter,
            manhwa: {
              id: manhwaDetail.id,
              title: manhwaDetail.title,
              slug: manhwaDetail.slug
            }
          },
          source: 'detail_file'
        });
      }

      // If chapter not found in array, return chapter list
      return res.json({
        success: true,
        data: {
          message: 'Chapter detail not found, showing all chapters',
          chapters: chapters
        }
      });
    } catch (err) {
      // Fallback: try individual chapter file
      try {
        const chapterDetail = await getFileFromStorage(`Chapter/komiku/${manhwaId}/${chapterId}.json`);
        return res.json({
          success: true,
          data: chapterDetail,
          source: 'chapter_file'
        });
      } catch (err2) {
        return res.status(404).json({
          success: false,
          error: 'Chapter not found'
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
