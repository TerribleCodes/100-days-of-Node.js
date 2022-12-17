const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

// Inside the course schema the author schema is being embedded
const Course = mongoose.model('Courses', new mongoose.Schema({
  name: String,
  authors: [authorSchema] // An array of sub documents
  // author: { type: authorSchema, required: true }
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

// createCourse(
//     'Node Course', 
//     [new Author({ name: 'Mosh' }), new Author({ name: 'John' }), new Author({ name: 'Doe' }), new Author({ name: 'Lorem' })]
// );

async function updateData(courseID){
  await Course.updateMany(
    {_id: courseID},
    // use $unset and pass an empty string to remove the relevent doucment 
    {$set: {'author.name':'John Doe'}}
  )
}
// updateData('639cb368bfb9040e7e552721');

async function addAuthor(courseID, author){
  const course = await Course.findById(courseID);
  course.authors.push(author);
  course.save();
}

// Adding a new author to the existing document
// addAuthor('639d44cc05290d2ebf19e9cf', new Author({name: 'Terry Lambda'}));