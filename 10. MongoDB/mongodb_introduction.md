# Introduction

- A database that stores data in JSON like objects.
- Tables --> 'collections'
- rows --> 'documents'
- There's no relationship between documents.

### Establishing the connection

```javascript
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27107/Playground')
    .then(() => console.log('connected successfully'))
    .catch(error => console.log('Eror has occured', error))
```

### Creating a Schema (Table in Relational Databases)

```javascript
const courseSchema = new mongoose.schema({
    name: String,
    date: { type: data, default: Date.now}.
    tags: [ String ],
    isPublished: Boolean
})
```

### Modeling the schema and saving the data

```javascript
// Collection name is 'courses' --> this will be included below
counst Courses = mongoose.model('courses', courseSchema);
```

```javascript
async function saveData() {
    const courses = new Courses({
        name: "NoedJS",
        tags: ["web dev", "mern"],
        isPublished: true
    })
    // The saving process takes some time hence it's included inside a async operation
    const result = await courses.save();
    console.log(result);
}

saveData();
```

## Retrieving data

```javascript
async function getData() {
    const result = Courses.find(); // To view all the data
    const result = await Courses
        .find({ author: 'Mosh', isPublished: false }) // To view data with above contents
        .sort({name:1}) // Sort by name ascending --> -1 to decending
        .limit(10) // limit the number of outputs
        .select({name:1, tags:1}) // Select specific data values 
    console.log(result);
}

getData();
```

