// index.js

const express = require('express');
const bodyParser = require('body-parser');
const { makeUpperCase, checkAdmin } = require('./middleware');
const { getSpecificStudent, getStudents, addStudent, updateStudent, deleteStudent } = require('./controllers/students');

const app = express();

app.use(bodyParser.json()); //using the middleware body-parser to parse the body of the request
app.use(makeUpperCase); //global middleware

app.get('/students/:id', checkAdmin, getSpecificStudent);
app.get('/students', getStudents);
app.post('/students', addStudent);
app.put('/students/:id', updateStudent);
app.delete('/students/:id', checkAdmin, deleteStudent);

app.use('/', function(req, res, next) {
    console.log('Request Url: + req.url');
    res.send('Hello');
});

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});