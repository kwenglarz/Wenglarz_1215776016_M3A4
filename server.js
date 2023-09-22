const dotenv = require('dotenv');
// this line has to come first since we need to tell where is the config file.
dotenv.config({ path: './config.env' });
const app = require('./app');

const port = process.env.PORT || 8000;

// Define default GET route
app.get('/', (req, res) => {
    res.json({"message": "Hello world!"});
});

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
