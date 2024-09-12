import express from 'express';
import articlesRoute from './routes/articles.routes';
import connectToMongoDB from './db/mongoConnection';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

//Ping Server
app.get('/ping', (req, res)=> {
    res.status(200).send('pong');
})

// Routes
app.use('/api/articles', articlesRoute);

// Connect to MongoDB
connectToMongoDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});