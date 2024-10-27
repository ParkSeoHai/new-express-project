const mongoose = require('mongoose');
const Blog = require('./model/blog');
const express = require("express");
const cors = require('cors');

mongoose.connect("mongodb+srv://parkseohai:imxMknCsDEdQ5KfQ@cluster0.ezm32.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

const app = express();

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => res.send("Express on Vercel"));

app.get("/addBlog", async (req, res, next) => {
    // Create a new blog post object
    const article = new Blog({
    title: 'Awesome Post!',
    slug: 'awesome-post',
    published: true,
    content: 'This is the best post ever',
    tags: ['featured', 'announcement'],
  });
  // Insert the article in our MongoDB database
  const result = await article.save();
  res.json(result);
})

app.post('/blog', async (req, res, next) => {
  const newBlog = await Blog.create({
    ...req.body
  });

  if (!newBlog) return res.status(500).json(`dd blog failed: ${req.body}`)

  return res.status(201).json(newBlog)
})

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;