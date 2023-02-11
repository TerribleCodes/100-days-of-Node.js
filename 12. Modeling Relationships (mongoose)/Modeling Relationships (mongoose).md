# Relationships between Objects/ Documents

- In order to decide what method to used whe creatinf relationships between objects, a tradeoff between `query performance` vs `consistency` must be performed.
- Also consider the following conditions as well
  - `Relationship Type`: Many:Many or 1:Many --> References are preffered
  - `Data Access Procedure`: If updated frequently, Embedding is preffered
  - `Data Closeness`: If the data are related closer, References are preffered

## Using References (Normalization)

- Provides `data consistency`
- It's the process of **Dividing data in multiple collections whith reference between those collections**  
  Ex:

```javascript
let author = {
  name: "myName",
  generes: {
    ObjectId: "1234",
    ObjectId: "4321",
  },
}; // Parent Object

let horror = {
  ObjectID: "1234",
  title: "horror",
}; // Child Object

let romance = {
  ObjectId: "4321",
  title: "romance",
}; // Child Object
```

## Using Embedded Documents

- Provides `performance`
- It's the process of **taking the related data and inserting it to the our document**  
  Ex:

```javascript
    let course = { actors: {
        {ObjectId: '1234', name: 'sample1'},
        {ObjectId: '4321', name: 'sample2'}
    }};
```

- To see the differences between [referencing and embedding](./References%20vs%20Embedded.png)

## Hybrid Approach

```javascript
let author = { name: "myName" };
let course = { author: { name: "myName" } };
```

## Referencing a Document

- When referencing to a certain document, the type of the reference item must be `mongoose.Schema.Types.ObjectId`.

Ex: Referencing the Course document `author` attribute to the name in `Author` document.

```javascript
const Course = mongoose.model(
  "courses",
  new mongoose.Schema({
    name: String,
    author: {
      type: mongoose.Schema.types.ObjectId,
      ref: "Authors",
    },
  })
);
```

#### `populate` method

- Required when viewing an referenced object

```javascript
async function listCourses() {
  const courses = await Course.find()
    // in the below populate method, 1st parameter is the pre defined 'author' in the course model.
    .populate("author", "name -_id") // Populates the data from the relevent ObjectID. Here the -_id excludes showing the id field at the output
    .select("name");
  console.log(courses);
}
```

<hr>

## Embedding a Document

```javascript
const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    // The required document that is to be embedded is placed as shown below
    author: {
      type: authorSchema,
      required: true,
    },
  })
);
```

#### Passing an array of embedded documents

```javascript
const course = mongoose.model(
  "Courses",
  new mongoose.Schema({
    name: String,
    author: [authorSchema],
  })
);
```

> When adding, removing a new author item to the same document it's required to define a new author.

```javascript
async function addAuthor(courseID, author) {
  const course = Courses.findById(courseID);
  course.author.push(author);
  course.save();
}
addAuthor("123", new Author({ name: "John Doe" }));
```

## Transactions

- Ensures the data transaction takes place without any error.
- If an action failed, the data will be rolled back.
- Else it will complete the data transfer.
- See more: `mongodb two phase commits`
- npm package `fawn` gives the ability to perform a two phase commit.

```javascript
try {
  new Fawn.task()
    .save("document_name", functionName)
    .update(/*Update query*/)
    .run();
} catch (ex) {
  res.status(500).send("Internal Server Error");
}
```

## Object IDs

- It's genereted by the driver

`_id: 639d7c3d4cf6581150a25219`

- 12 bytes
- First 4 bytes: timestamp
- Next 3 bytes: machine identifier
- Next 2 bytes: processor ID
- Last 3 bytes: counter

```javascript
const id = mongoose.Types.ObjectId();
// From the below method the time can be extracted
console.log(id.getTimeStamp());

//From the below method the object id can be validated
const validate_id = mongoose.Types.ObjectId.isValid("639d7c3d4cf6581150a25219");
console.log(validate_id);
```

- To validate an object ID, better approach is to place the relevent validation inside the JOI validation method.

```javascript
Joi.objectId = require("joi-objectid")(Joi);
function validate(rental) {
  const Schema = Joi.object({
    CustomerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });
  return Schema.validate(rental);
}
```
