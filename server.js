const mysql = require('mysql');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// MySQL database connection configuration
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootuser',
    database: 'foodDatabase',
    port: 3306
});

// Connect to the MySQL database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err.stack);
        return;
    }
    console.log('Connected to MySQL database as ID ' + connection.threadId);
});

// Serve static files (HTML, CSS, JavaScript)
app.use(express.static('public'));


// Route to fetch data from the database
app.get('/url', (req, response) => {
    // Perform a query to fetch data
    connection.query('SELECT * FROM meals;', (error, results, fields) => {
        if (error) {
            console.error('Error executing query:', error);
            return response.status(500).send('Error fetching data from database');
        }

        // Send the fetched data as JSON response
        response.json(results);
    });
});


//this is for testing don't mind it
// app.get("/url", (req, res, next) => {
//     response.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
// });

// Start the server
const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

