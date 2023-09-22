const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
const path = require('path');

const app = express();
//This is CORS Ref:https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
var corsOptions = {
    origin: "http://localhost:8080"
};
app.use(cors(corsOptions));

// 1) MIDDLEWARES Morgan is used for debugging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// 2)MIDDLEWARE json is used for injecting the body attribute in the pipeline
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {
console.log('Hello from the middleware 👋');
    next();
});

// 3) MIDDLE ROUTES loading
const customersRouter = require('./routes/customersRoutes');
app.use('/api/v1/customers', customersRouter);
const usersRouter = require('./routes/usersRoutes');
app.use('/api/v1/users', usersRouter);

module.exports = app;
