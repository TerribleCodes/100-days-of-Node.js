const mongoose = require('mongoose');

// Define the schema
const courseSchema = new mongoose.Schema({
    tags: [ { 
        type: Array,
        validate: {
            isAsync: true,
            validator: function(v, callback){
                setTimeout(() => {
                    const result = v && v.length<10
                    callback (result)
                }, 4000)
            }
        },
        message: 'Course must have at least one tag'
     } ],
    date: { type: Date },
    name: { type: String, reqired: true },
    author: { type: String, reqired: true },
    isPublished: { type: Boolean, reqired: true },
    price: { type: Number, reqired: true }
});

// Model the Schema
const courseModel = mongoose.model('courses', courseSchema);

// connection url
const url = 'mongodb://localhost:27017/mongo-exercises';

// connect to the database
mongoose.connect(url)
    .then(console.log(`Successfully connected to the ${url}`))
    .catch(err => console.log('Error cooured', err));

// Manually save data to the database
async function createCourse(){
    const newCourse = new courseModel({
        tags: [ 'pineapple', 'with', 'pizza' ],
        name: " How to get Nailed easily ",
        author: " Tim Sweeny ",
        isPublished: true,
        price: {
            type: Number,
            required: function(){ return this.isPublished }
        }
    });
    try{
        await newCourse.save();
    }
    catch(error){
        for (field in error.errors){
            console.log(error.errors[field]);
        }
    }
}
createCourse();



// View by id
async function viewCourse(id){
    courseModel.findOne(
        { _id: id}
    )
        .exec((err, result) => {
            if (err) return console.log(err);
            console.log(result);
        })
}
// viewCourse('6392dafc915f696c5e31adb1')



// Update the data
async function updateCourse(id){
    courseModel.findOneAndUpdate(
        { _id: id },
        { $set: { name: 'qwerty' }},
        { upsert: true },
        (err, result) => {
            if (err) return console.log("error occured...", err);
            console.log(result);
        }
    )
}
// updateCourse('6392dafc915f696c5e31adb1');



// Delete data
async function deleteCourse(id){
    courseModel.findOneAndDelete(
        { _id: id},
        (err, result) => {
            if (err) return console.log(err);
            console.log(result);
        }
    )
}
// deleteCourse('639084fc192d6e7617af16fe')
