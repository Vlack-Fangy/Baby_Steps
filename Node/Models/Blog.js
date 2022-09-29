const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

//Small letters for Schema
const blogSchema = new Schema({
    Title: {
        type: String,
        required: true
    },
    Snippet:{
        type: String,
        required: true
    },
    Body:{
        type: String,
        required: true
    }
}, { timestamps: true });

//Capitals for Models
//connects to the Blogs on the MongoDB
const Blog = Mongoose.model('Blogs', blogSchema);

console.log(Blog);

module.exports = Blog;