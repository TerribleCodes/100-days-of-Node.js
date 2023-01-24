# CRUD Operations in MongoDB

## Inserting Data

* There are 2 methods to insert data into mongodb documents
    * When inserting the documents, the connection must be already established to the database.
    * `insertOne()` --> `db.<collection_name>.insertOne()`  
    Example: 
    ```javascript
        db.grades.insertOne({
            student_id: 1001, 
            scores: [
                {subject: "maths", score: 55}, {subject: "science", score: 77}, {subject: "geo", score: 23}
            ]
        })
    ```
    * `insertMany()` --> `db.<collection_name>.insertMany([<document1>, <document2>, <document3>])`  
    Example: 
    ```javascript
        db.grades.insertMany([
            {student_id: 1002, scores: [
                {subject: "maths", score: 66}, {subject: "science", score: 73}, {subject: "geo", score: 88}
            ]},
            {student_id: 1003, scores: [
                {subject: "maths", score: 54}, {subject: "science", score: 75}, {subject: "geo", score: 34}
            ]},
            {student_id: 1004, scores: [
                {subject: "maths", score: 56}, {subject: "science", score: 78}, {subject: "geo", score: 24}
            ]}
        ])
    ```

## Finding documents in a mongoDB collection (findOne() and find()).

* `db.collection.find()`
* To find a specific document --> `db.<collectoin_name>.find({field: "value"})`. Similar to the $eq operator
    ```javascript
                db.accounts.find( { account_id: 370583 } )
    ```

* To find data which contains user specified values --> `db.<collection_name>.find({ field: { $in: [value1, value2, value3] } })`
    ```javascript
    db.accounts.find( { account_id: { $in: [ 370583, 692278, 212024 ] } } )
    ```
## Finding the documents using the comparisson operator ($lt, $gt, $lte, $gte)

* `$gt`, `$lt`, `$gte`, `$lte`
* `db.<collection_name>.findOne({"<field.subfield1.subfield2>": {$gt: value}})`  
    * Example: 
    ```javascript
        db.zips.findOne({"pop": {$gt: 19357}})`
    ```
## Quering on Array Elements in MongoDB

* This doen't return scalar values; i.e. it only returns the elements which are in an array.
* Operator finds all documents that contain the specified subdocument.

```javascript
    db.<collection>.find({
        <field> : {
            $elemMatch: { $eq: "<data>" }
        }
    })
```

Example:
```javascript
    db.accounts.find({
        products: {
            $elemMatch: { $eq: "InvestmentStock"}
        }
    })
```

or to find multiple elements

```javascript
    db.sales.find({
        items: {
            $elemMatch: {name: "laptop", price: {$gt: 880}, quantity: {$gte: 1}}
        }
    })
```

## Logical Operators

* `$and` `$or`
```javascript
    db.<collection_name>.find({
        $and: [{key: value}, {key: value}, {key: value}] // here the comma acts as the AND operator.
    })
```

Example: 
```javascript
    db.planets.find({$and: [{orderFromSun: {$gte: 3}}, {hasRings: false}]})
```

## Replacing a document in MongoDB

```javascript
    db.collection.replaceOne(filter, replacement, options)
```
Example: 
```javascript
    db.books.replaceOne(
        {
            _id: ObjectId("6282afeb441a74a98dbbec4e"),
        },
        {
            title: "Data Science Fundamentals for Python and MongoDB",
            isbn: "1484235967",
            publishedDate: new Date("2018-5-10"),
            thumbnailUrl:
            "https://m.media-amazon.com/images/I/71opmUBc2wL._AC_UY218_.jpg",
            authors: ["David Paper"],
            categories: ["Data Science"],
        }
    )
```

## Updating a document in MongoDB

```javascript
    db.collection.updateOne(
        <filter>, //contains the selection criteria for the update process
        <update>, //update expression
        {options}
    )
```

* `updateOne()` only works if the filter has a matching document in the collection. To create a document if there's no matching unit, use the option `{upsert: true}`
* Along with the `updateOne()` we use `$set` and `$push`. Here `$set` will add new fields or replaces values in the document. And `$push` will append the value to the array.

Example: 
```javascript
    //usage of $set
    db.podcasts.updateOne(
        {_id: ObjectId("6282afeb441a74a98dbbec4e")},
        {$set: {subscribers: 23523}}
        {upsert: true}
        )
```

```javascript
    //usage of $push
    db.podcasts.updateOne(
        {_id: ObjectId("6282afeb441a74a98dbbec4e")},
        {$push: {myArray: "value1", "value2"}}
    )
```

* `findAndModify()` method can be used as an alternative for using the `findOne()` and `updateOne()`  
Example: 
```javascript
    db.document.findOneModify({
        query: {_id: ObjectId("6282afeb441a74a98dbbec4e")},
        update: { $inc : {downloads: 1}}, // add the update query here
        new: true // true means it returns the updated document
    })
```

* Using the `updateMany()` (There are few drawbacks in this method)
```javascript
    db.books.updateMany(
        { publishedDate: { $lt: new Date("2019-01-01") } }, // Filter item
        { $set: { status: "LEGACY" } } // update
    )
```

## Deleting a document

* `deleteOne()`
```javascript
    db.collection.deleteOne({
        {_id: ObjectId("6282afeb441a74a98dbbec4e")};
    })
```

```javascript
    db.podcasts.deleteMany({category: “crime”});
```

## Modifying Query Results

