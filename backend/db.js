const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://babuprakash514781_db_user:<spanishclass>@portfolio.uh8jzxb.mongodb.net/?appName=portfolio';

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        seedInitialPosts();
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

const messageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);
const Message = mongoose.model('Message', messageSchema);

async function seedInitialPosts() {
    try {
        const count = await Post.countDocuments();
        if (count === 0) {
            await Post.create([
                { title: 'My First Post', content: 'This is a sample blog post about technology and biology. Welcome to my new website!' },
                { title: 'Studying Abroad Journey', content: 'Sharing my experiences and thoughts about studying abroad and exploring new cultures.' }
            ]);
            console.log('Sample posts seeded successfully');
        }
    } catch (err) {
        console.error('Error seeding posts:', err);
    }
}

module.exports = { Post, Message };
