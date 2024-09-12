import { Router } from 'express';
import Article from '../models/article.model';


const router = Router();

// Create an article
router.post('/', async (req, res) => {
  try {
    const newArticle = new Article(req.body);
    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Get all articles
router.get('/all', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single article by ID
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update an article by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(updatedArticle);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an article by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    if (!deletedArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json({ message: 'Article deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Enhanced search route
router.get('/', async (req, res) => {
  const { id, title, author } = req.query; // Extract query parameters

  try {
    // Build the search criteria dynamically
    const searchCriteria: any = {}; // Start with an empty object

    if (id) {
      searchCriteria._id = id; // Search by ID
    }
    if (title) {
      searchCriteria.title = { $regex: title as string, $options: 'i' }; // Case-insensitive search by title
    }
    if (author) {
      searchCriteria.author = { $regex: author as string, $options: 'i' }; // Case-insensitive search by author
    }

    // Perform the search
    const articles = await Article.find(searchCriteria);

    if (articles.length === 0) {
      return res.status(404).json({ message: 'No articles found matching the criteria' });
    }

    res.json(articles);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});


export default router;