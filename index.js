const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

const courses = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'}
    
]

app.get('/', function(req, res) {
    res.send('Hello World')
});

app.get('/api/courses', function(req,res) {
    res.send(courses);
});

app.post('/api/courses', function(req, res) {
    const schema = {
        name:Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);
    if(result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    };
    
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course)
    res.send(course);
});

app.put('/api/courses/:id', function(req, res) {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given id was not found');

    const {error} = validateCourse(req.body);
    if(error) {
        res.status(400).send(result.error.details[0].message);
        return;
    };

    course.name = req.body.name;
    res.send(course);
})

function validateCourse(course) {
    const schema = {
        name:Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

app.get('/api/courses/:id', function(req,res) {
   const course = courses.find(c => c.id === parseInt(req.params.id));
   if(!course) res.status(404).send('The course with the given id was not found');
   res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log(`Listening on port ${port}...`);
});


