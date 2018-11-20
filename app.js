
// setup express
const express = require('express');
const app = express();

// setup body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// setup template engine
app.set('view engine', 'ejs');

// setup static files
app.use(express.static(__dirname + '/public'));

// used for PUT and DELETE request
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// setup mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dev_blog', {useNewUrlParser: true});

const Schema = mongoose.Schema;

let blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now} // --> current date
});

const Blog = mongoose.model('Blog', blogSchema);

// RESTFUL ROUTES

app.get('/', (req, res) => {
    // res.redirect('/blogs');
    res.render('landing');
});

app.get('/blogs', (req, res) => {

    Blog.find({}, (error, blogs) => {
        if(error) {
            console.log(error);
        } else {
            res.render('index', {blogs: blogs});
        }
    });

});

// Route New
app.get('/blogs/new', (req, res) => {
    res.render('new');
});

// Create Blog
app.post('/blogs', (req, res) => {
    var title = req.body.title;
    var image = req.body.image;
    var body = req.body.body;
    var newBlog = {title: title, image: image, body: body};
    Blog.create(newBlog, (error, newlyCreated) => {
        if(error) {
            res.render('new');
        } else {
            res.redirect('/blogs');
        }
    });
});

// show info about one blog post
app.get('/blogs/:id', (req, res) => {
    // find a blog provided by ID
    Blog.findById(req.params.id, (error, foundBlog) => {
        if(error) {
            console.log(error);
        } else {
            res.render('show', {blog: foundBlog});
        }
    });
});

// edit route
app.get('/blogs/:id/edit', (req, res) => {
    Blog.findById(req.params.id, (error, foundBlog) => {
        if(error) {
            res.redirect('/blogs');
        } else {
            res.render('edit', {blog: foundBlog});
        }
    });

});

// update route
app.put('/blogs/:id', (req, res) => {
    var updateTitle = req.body.title;
    var updateImage = req.body.image;
    var updateBody = req.body.body;
    var updateData = {title : updateTitle, image: updateImage, body: updateBody};
    Blog.findByIdAndUpdate(req.params.id, updateData, (error, updatedBlog) => {
        if(error) {
            console.log(error);
            res.redirect('/blogs');
        } else {
            res.redirect('/blogs/' + req.params.id);
        }
    });

});

// delete route
app.delete('/blogs/:id', (req, res) => {
    Blog.findByIdAndRemove(req.params.id, (error) => {
        if (error) {
            res.redirect('/blogs');
        } else {
            res.redirect('/blogs');
        }
    });
});


// setup port for listening
app.listen(4000, () => {
    console.log('DevBlog app has been started...');
});
