const mongoose = require('mongoose');
const Blog = require('./model/blog');
const express = require("express");

mongoose.connect("mongodb+srv://parkseohai:imxMknCsDEdQ5KfQ@cluster0.ezm32.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

const app = express();

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

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;