const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const courses = [
    {"id":1, "name":"MongoDB"},
    {"id":2, "name":"Express"},
    {"id":3, "name":"React"},
    {"id":4, "name":"NodeJS"}
];

//GET request
app.get('/api/courses', (request, response) => {
    response.send(courses);
})

// Post request
app.post('/api/courses', (request,response) => {
    const schema = Joi.object({
            name: Joi.string().min(3).required()
        })
    const result = schema.validate(request.body);

    if(result.error){
        response.status(400).send(result.error);
        return;
    }

    const course = {
        id: request.body.id,
        name: request.body.name
    };
    courses.push(course);
    response.send(course);
});

// PUT 
app.put('/api/courses/:id', (request, response) => {
    // look up the course; if not return 404
    const course = courses.find(c => c.id === parseInt(request.params.id));
    if(!course)return response.status(404).send('N/A'); //404 error

    // Validate; if invalid, 400 bad request error
    const {error} = validateData(request.body); // Object structuring; returning items can be placed Ex: instead of result.error --> {error}
    if(error){response.status(400).send(error); return;}
    // Update course and return the course
    course.name = request.body.name;
    response.send(course);
})

// HTTP DELETE
app.delete('/api/courses/:id', (request, response) => {
    // Look up the course i.e. whether it's available
    const course = courses.find(c => c.id === parseInt(request.params.id));
    if(!course) return response.status(404).send('N/A');

    // Input validation isn't required because the string is already provided via the irl
    
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    response.send(course);
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on ${port}`)
})

// A function has been created to validate thus it can be reused
function validateData(course){
    const schema = Joi.object(
        {
            name: Joi.string().min(3).required()
        }
    )
    return schema.validate(course);
}