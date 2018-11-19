
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

// Blog.create({
//     title: "Test Blog",
//     image: "https://images.pexels.com/photos/574070/pexels-photo-574070.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//     body: "This is a test blog, just want make sure that everythings works... :)"
// });

// RESTFUL ROUTES

app.get('/', (req, res) => {
    // res.redirect('/blogs');
    res.send('This is main page');
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


// setup port for listening
app.listen(4000, () => {
    console.log('DevBlog app has been started...');
});
