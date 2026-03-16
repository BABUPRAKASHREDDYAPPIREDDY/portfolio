require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { Post, Message } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// API Routes

// Get all blog posts
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await Post.find().sort({ created_at: -1 });
        res.json({
            "message": "success",
            "data": posts
        });
    } catch (err) {
        res.status(400).json({"error": err.message});
    }
});

// Add a new blog post
app.post('/api/posts', async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({"error": "Title and content are required"});
    }
    try {
        const newPost = new Post({ title, content });
        await newPost.save();
        res.json({
            "message": "success",
            "data": newPost
        });
    } catch (err) {
        res.status(400).json({"error": err.message});
    }
});

// Submit contact form message
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({"error": "Name, email, and message are required"});
    }
    try {
        const newMessage = await Message.create({ name, email, message });
        res.json({
            "message": "success",
            "data": newMessage
        });
    } catch (err) {
        res.status(400).json({"error": err.message});
    }
});

// Fallback to index.html for single page app routing if needed
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
