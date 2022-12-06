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
    date: { type: date, default: Date.now}.
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
    const result = await Courses.find(); // To view all the data
    const result = await Courses
        .find({ author: 'Mosh', isPublished: false }) // To view data with above contents
        .sort({name:1}) // Sort by name ascending --> -1 to decending
        .limit(10) // limit the number of outputs
        .select({name:1, tags:1}) // Select specific data values 
    console.log(result);
}

getData();
```

## Comparisson Operators

`eq` - Equals to  
`ne` - Not equals to  
`lt` - Less than  
`lte` - Less than or equals to  
`gt` - Greater than  
`gte` - Greater than or equals to  
`in`  
`nin` - Not in  

Ex: 
```javascript
const courses = await Courses
    // Finding items where the price is greater than 10 and less than or equlas to 20
    .find({price: {$gt: 10, $lte: 20}})
```
---
```javascript
    // Items with specific prices
    .find({price: {$gt: [10, 22, 13]}})
```

## Logical Query Operators

`and` `or`  

```javascript
const courses = await Courses
    .find()
    // Finding the results relevent to the aothor or isPublished true.
    .or ([{author: 'Mosh', isPublished: true}])
```

```javascript
const courses = await Courses
    .find()
    // Finding the results relevent to the aothor and isPublished true.
    .and ([{author: 'Mosh', isPublished: true}])
```

## Regular Expressions

`/pattern/`  
> pattern is case sensitive therefore to ignore the cases add `i` at the end of the pattern  
`/pattern/i`

```javascript
const courses = await Courses
    // Find which starts with 'Mosh'
    .find({author: /^Mosh/i})
```
`/sh$/` --> Ends with `sh`  
`/.*mosh*./` --> Which contains the `mosh` keyword.  

- To count the number if resulting documents, 
`// .find().count() //`  Simply add a .count() to the relevent filter.

## Documents in a given pagination

```javascript
const pageNumber = 2;
const pageSize = 10;
const courses = await Courses
    .find()
    .skip((pageNumber-1)*pageSize)
    .limit(pageSize)
```

## Updating Documents

> Updating the database by retrieving the `id`. This approach is suitable if there's client input.

```javascript
async function updateCourse(id){
    const course = Courses.findById(id);
    if (!course) return;

    // Approach 1
    // course.isPublished = true;
    // course.author = 'Another Author';

    // Approach 2
    course.set({
        isPublished: true,
        author: 'Another Author'
    })
    const result = await course.save();
    console.log(result);
    // It didn't work either :3 
}
updateCourse('5a68fdc3615eda645bc6bdec');
```

> Updating the database without retrieving the data from the database.

```javascript
    // First argument is a filter object Ex: filter by ID
    const courseResult = Courses.updateMany({_id: id}, {
        // Second argument is the update object
        $set: {
            author: 'Mosh',
            isPublished: false
        }
    });
    console.log(courseResult);
```

## Deleting Documents

```javascript
async function removeCourse(id){
    // const result = await Courses.deleteOne({_id:id});
    const result = await Courses.findByIdAndDelete(id);
    console.log(result);
}
removeCourse('5a68fdc3615eda645bc6bdec');
```
