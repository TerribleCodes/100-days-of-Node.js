const mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb://localhost/Playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Create the author schema and model it
const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));

// Create the course schema and model it
const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  // Reference string
  author: {
    // Type is an object ID
    type: mongoose.Schema.Types.ObjectId,

    // Referencing document is the "Author" document
     ref: 'Author'
  }
}));

// Save the data to the author document via a function
async function createAuthor(name, bio, website) { 
  const author = new Author({
    name, 
    bio, 
    website 
  });
  const result = await author.save();
  console.log(result);
}

// Save the data into course Document via a function 
async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  const result = await course.save();
  console.log(result);
}

// Outputtinf the course contents via a function
async function listCourses() { 
  const courses = await Course
    .find()
    .select('name');
  console.log(courses);
}

createAuthor('Mosh', 'My bio', 'My Website');

// A course will be created related to the ID of the above created author
// createCourse('Node Course', 'authorId')

// listCourses();