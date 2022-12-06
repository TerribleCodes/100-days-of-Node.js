const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Playground')
    .then(() => console.log("Connected to the database successfully..."))
    .catch(Error => console.log("Error occured: ", Error))

// Creating a schema
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now},
    isPublished: Boolean
});

// Modeling the schema
const Courses = mongoose.model('courses', courseSchema);

// Sending the data
async function saveData(){
    const courses = new Courses({
        name: "Angular",
        author: "Mosh",
        tags: ['mean stack', 'web development'],
        isPublished: false
    })
    const result = await courses.save();
    console.log(result);
}
// saveData();

// Retrieving data
async function getData(){
    // find method is applied along with the Courses class
    // const courses = await Courses.find();
    const courses = await Courses
        .find({ author: 'Mosh', isPublished: true})
        .limit(10)
        .sort({name:1})
        .select({name:1, tags:1})
    console.log(courses)
}
// getData();
