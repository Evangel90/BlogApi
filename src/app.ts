import express from "express";
import articlesRoute from "./routes/articles.routes";
import connectToMongoDB from "./db/mongoConnection";
import usersRoute from "./routes/user.routes";
import passport from "passport";

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(passport.initialize());

require('./config/passport')(passport);

//Ping Server
app.get("/ping", (req, res) => {
  res.status(200).send("pong");
});

// Routes
app.use("/api/articles", articlesRoute);
app.use("/api/users", usersRoute);

// Connect to MongoDB
connectToMongoDB()
  .then(() => {
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  });
