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
app.use(express.static('Async'));


// Route to fetch data from the database
app.get('/data', (req, res) => {
    const { calories, protein, carbohydrates } = req.query;
    let query = 'SELECT * FROM meals WHERE 1=1'; // Start with a base query

    // Check if calories parameter is provided
    if (calories) {
        query += ` AND calories = ${calories}`;
    }

    // Check if protein parameter is provided
    if (protein) {
        query += ` AND protein = ${protein}`;
    }

    // Check if carbohydrates parameter is provided
    if (carbohydrates) {
        query += ` AND carbohydrates = ${carbohydrates}`;
    }

    // Perform the modified query to fetch data
    connection.query(query, (error, results, fields) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).send('Error fetching data from database');
        }

        // Send the fetched data as JSON response
        res.json(results);
    });
});


// Start the server
const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

