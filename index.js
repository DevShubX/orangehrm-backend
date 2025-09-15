const express = require('express');
const cors = require('cors');
const { connecToDB } = require('./config/db');
const indexRoute = require('./routes/index.route');
const PORT = process.env.PORT || 8000;
require('dotenv').config()

// Connect DB
connecToDB();

// Initialize app
const app = express();

// CORS Setup
const corsOptions = {
    origin: "http://localhost:3000",
    optionSuccessStatus: 200,
    credentials: true,
}
app.use(cors(corsOptions));

// JSON Data Handling
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.get('/', (req, res) => {
    return res.status(200).send('Welcome to the OrangeHRM API.');
});

app.use('/api', indexRoute);

app.listen(PORT, () => {
    console.log(`App is listening at port: ${PORT} `);
});
