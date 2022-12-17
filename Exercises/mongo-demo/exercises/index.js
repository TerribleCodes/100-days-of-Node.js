const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongo-exercises')
    .then(() => console.log("Successfully connected to the server..."))
    .catch(error => console.log("Error has occured: ",error))

const courseSchema = new mongoose.Schema({
    tags: [ String ],
    date: { type: Date, default: Date.now },
    name: String,
    author: String,
    isPublished: Boolean,
    Price: Number
});

const Courses = mongoose.model('courses', courseSchema);

async function viewData(){
    // All the courses
    // const results = await Courses.find();

    // Sort
    // const results = await Courses
    //     .find()
    //     .sort({name:1})

    // Select only name and the author
    // const results = await Courses
    // .find()
    // .select({name:1, author:1})

    // Sort the prices from highest to the lowest
    // const results = await Courses
    //     .find({ isPublished: true, tags: { $in: ['frontend', 'backend']}})
    //     // also '-price' can be used
    //     .sort({ price: -1 })
    //     .select({ name: 1, author: 1, price: 1})

    const results = await Courses  
        .find()
        // Finding results where the price is greater than 15USD and the name contails 'by'
        .or([
            { price: { $gt: 15 }},
            { name: /.*by*./i }
        ]);
        // Above code snippet did't work :3

    console.log(results)
}
// viewData()

async function updateCourse(id){
    // const course = Courses.findById(id);
    // First argument is a filter object Ex: filter by ID
    const courseResult = await Courses.update({_id: id}, {
        // Second argument is the update object
        $set: {
            author: 'Mosh Hamedani',
            isPublished: false
        }
    }/*, {new: true }*/);
    console.log(courseResult);
    // if (!course) return;

    // Approach 1
    // course.isPublished = true;
    // course.author = 'Another Author';

    // Approach 2
    // course.set({
    //     isPublished: true,
    //     author: 'Another Author'
    // })
    // const result = await course.save();
    // console.log(courseResult);
    // It didn't work either :3 
}
// updateCourse('5a68fdc3615eda645bc6bdec');

async function removeCourse(id){
    // const result = await Courses.deleteOne({_id:id});
    const result = await Courses.findByIdAndDelete(id);
    console.log(result);
}
removeCourse('5a68fdc3615eda645bc6bdec');