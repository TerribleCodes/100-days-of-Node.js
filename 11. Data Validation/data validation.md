# Data Validation

- Data can be validated either from `mongoose` itself or `joi`.
- In RESTful APIs `joi` will be used.

Ex:
```javascript
    const courseSchema = new mongoose.Schema({
        name: { type: String, required: true}, 
        data: { type: date, required: false}
        // other data types
    })
```

- At the function where the data being saved, `// data.save() //`

```javascript
try{
    // const result = await data.save();
    data.validate(); // Can also be used
    console.log(result);
}
catch(e){
    console.log(e);
}
```

- The required property can either be a `boolean` or a `function`.
```javascript
    name: { type: String, required: true },
    isPublished: { type: Boolean, required: true},
    price: { 
        type: Number, 
        required: function () {
            // If this.published is true, Price will be aquired. Else not required.
            return this.isPublished;
        }}
```

- There are other validators as well
example: 
```javascript
    name: {
        type: String,
        required: true,
        minlength: 12,
        maxlength: 100
    }
    category: {
        type: String, 
        enum: [ 'web', 'mobile', 'network' ] // Enum checks whether the input matches one of the entities in the daclared array.
    }
```

- For an array, instead of defining `myArray: [ Array ]`
```javascript
    tags: {
        type: Array,
        required: function (v){
            return v && v.length>0;
        },
        message: 'Must have at least 1 tag'
    }
```

- To use an Async validator
```javascript
tags: {
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
    message: 'course must contain at least one tag'
    }
    
```

- To obtain a list of errors
```javascript
// Data input code
catch(error){
        for (field in error.errors){
            // console.log(error.errors[field]);
            //or
            console.log(error.errors[field].message);
        }
}
```

- SchemaTypes

```javascript
    category: {
        type: String,
        lowercase: true,
        // uppercase: true,
        trim: true
    },
    price{
        type: Number,
        get (value) => Math.round(value); // When fetching the price from the database, the value we get wiil be rounded off
        set (value) => Math.round(value); // When updating the values to the database, the value will be rounded off
    }

```
