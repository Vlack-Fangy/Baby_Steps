//blog_index,blog_details,blog_create_get,blog_post,blog_delete
const Blog = require('../Models/Blog');

const blog_index = (req, res) => {
    Blog.find().sort({createdAt:-1}).then((result) => {
        res.render('index', {
            title: 'All Blogs',
            blogs: result
        })
    });
}

const blog_details = (req, res) => {
    const id = req.params.id;

    console.log(id);
    Blog.findById(id)
        .then((result) => {
            res.render('details', { blog: result, title: 'Blog Details' })
        }).catch((err) => console.log(err));
}

const blog_create_get = (req, res) => {
    res.render('create',{title:'Create a new vlock'});
}

const blog_post = (req, res) => {
    console.log(req.body);

    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => console.error(err));
}

const blog_delete = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({
                redirect: '/blogs'//Probs Probs Probs
            });
        })
        .catch((err) => console.error(err));
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_post,
    blog_delete
}