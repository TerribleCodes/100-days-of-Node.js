const mongoose = require('mongoose');

// Establish the connection
mongoose.connect('mongodb://localhost:27017/mongo-exercises')
    .then(() => console.log("connected successfully..."))
    .catch(error => console.log("Error occured: ", error))

// Create the schema
const mySchema = new mongoose.Schema({
    tags: [Array],
    date: Date,
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
})

// Model the schema
// ...mongoose.model('collection_name', schema_name)...
const courses = mongoose.model('courses', mySchema);


// Save data function
const saveData = async () => {
    const inputData = new courses({
        tags: ['insert','omg','ultra','cringe','clickbait'],
        name: "MERN Stack",
        author: "Madawa De Silva",
        isPublished: true,
        price: 200
    })
    const result = await inputData.save();
    console.log(result)
}
// saveData();


// Update function
const updateData = async () => {
    const data = await courses.updateOne(
        // Argument 1 ==> Attribute of the collection
        { name: 'Express.js Course' },

        // Argument 2 ==> New value/values
        { $set: {price: 1999, name: 'Um...'}}
    )
    console.log(data);
}
// updateData();


// Dalete function
const deleteDB = async () => {
    const data = await courses.deleteOne(
        {name: 'Um...'}
    );
    console.log(data);
}
// deleteDB();


// Find function
const findData = async () => {
    const data = courses.find();
    console.log(data)
}
// findData();
