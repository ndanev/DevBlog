
// setup express
const express = require('express');
const app = express();

// setup body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// setup template engine
app.set('view engine', 'ejs');

// setup static files
app.set(express.static('public'));

// setup mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dev_blog', {useNewUrlParser: true});

let blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now} // --> current date
});

const Blog = mongoose.model('Blog', blogSchema);


// setup port for listening
app.listen(4000, () => {
    console.log('DevBlog app has been started...');
});
