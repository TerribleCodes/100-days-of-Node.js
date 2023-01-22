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

## Finding documents in a mongoDB collection.

* `db.collection.find()`
* To find a specific document --> `db.<collectoin_name>.find({field: "value"})`. Similar to the $eq operator
    * Example: `db.accounts.find( { account_id: 370583 } )`

* Using the $in operator ---> `db.<collection_name>.find({ field: { $in: [value1, value2, value3] } })`
    * Example: `db.accounts.find( { account_id: { $in: [ 370583, 692278, 212024 ] } } )`

## Finding the documents using the comparisson operator

* `$gt`, `$lt`, `$gte`, `$lte`
* `db.<collection_name>.findOne({"<field.subfield1.subfield2>": {$gt: value}})`
    * Example: `db.zips.findOne({"pop": {$gt: 19357}})`

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