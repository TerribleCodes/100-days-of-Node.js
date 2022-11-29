# REST Introductoin

 - Representatoinal State Transfer (REST)  
 - CRUD operations happen here
 - HTTP Methods
    > GET - To get data  
    > POST - To send data  
    > PUT - To update data  
    > DELETE - To delete data  

Example:  
Request: `GET api/customers/id=1`  
Response: `{"id":1, "name":"sample"}`

# Express Framework

- Gives flexibility when handling common `http` methods.

```javascript
const express = require('express');
const app = express();

// `/` represents the root folder. Whenever the url is specified with `/` following response will be generated.
app.get('/', (request, response) => {
    response.send("Hello");
});


// When `/api/courses` specified, following response (which contains an array of elements) will be generated.
app.get('/api/courses', (request, response) => {
    response.send([12, 4, 35, "Hi"])
});


// 3000 will listen to the request
const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening to port ${port}`));
```

> Error: nodemon : "File C:\Users\MADAWA\AppData\Roaming\npm\nodemon.ps1 cannot be loaded because running scripts is disabled on this system. For more information, see       
about_Execution_Policies at https:/go.microsoft.com/fwlink/?LinkID=135170."  
Solution: Run PowerShell as an admin.  
`C:\WINDOWS\system32> Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`  

<hr>

`npm install -g nodemon` Gives the ability to keep application on the run.  
Use `nodemon app.js` to run the application.  

## Handling GET requests

```javascript
// Depending on the attributes available in the URL, following method will fetch the values
app.get('/api/courses/:id', (request, response) => {
    const course = courses.find(c => c.id === parseInt(request.params.id));
    if(!course) return response.status(404).send('Requested content is not available'); //404 error
    response.send(course);
});
```

## Handling POST requests using POSTMAN

```javascript
app.post('/api/courses/:id', (request,response) => {
    // A course object will be created because the `courses` is an array of objects. We need to push the object to the coueses.
    const course = {
        id: courses.length+1,
        // If the ID is handled manually, we can use the following procedure
        // id: request.body.id,
        name: request.body.name
    };
    courses.push(course);
    response.send(course);
});
```

- In the postman, create a post request with the body of JSON

```javascript
// Provide the id if required
{
	"name": "new course"
}
```

<hr>

### Input Validation

> JOI package is used to validate complex data structures  

```javascript
/ Post request
app.post('/api/courses', (request,response) => {
    // Using JOI
    // Joi version 17.7.0
    const schema = Joi.object({
            name: Joi.string().min(3).required()
        });
    // Instead of accessing the value.error use the {error} notation
    const {error} = schema.validate(request.body);
    if (error) return response.status(400).send(error);

    // This is manual validation 
    // if(!request.body.name || request.body.name.lenght < 3){
    //     response.status(400).send('Name is required');
    //     return;
    // }
    
    const course = {
        // id: courses.length+1,
        id: request.body.id,
        name: request.body.name
    };

    courses.push(course);
    response.send(course);
});
```

<hr>

## Handling PUT

```javascript
app.put('/api/courses/:id', (request, response) => {
    const course = courses.find(c => c.id === parseInt(request.params.id));
    if(!course) response.status(404).send('N/A'); 

    const {error} = validateData(request.body);
    if(error) return response.status(400).send(error);

    // Index can be obtained if requierd
    // let index = course.indexOf(course);
    // course[index].name = request.body.name;
    course.name = request.body.name;
    response.send(course);
})

// A function has been created to validate thus it can be reused
function validateData(course){
    const schema = Joi.object({
            name: Joi.string().min(3).required()
        })
    return schema.validate(course);
}
```

## Handling DELETE

```javascript
app.delete('/api/courses/:id', (request, response) => {
    const course = courses.find(c => c.id === parseInt(request.params.id));
    if(!course) return response.status(404).send('N/A');
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    response.send(course);
})
```

