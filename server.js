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

// Route to fetch data from the database with pagination and filtering
app.get('/data', (req, res) => {
    const { page = 1, limit = 10, calories, protein, carbohydrates } = req.query;
    let query = 'SELECT COUNT(*) AS totalRecords FROM meals WHERE 1=1'; // Query to count total records

    // Check if calories parameter is provided
    if (calories) {
        query += ` AND calories = ${mysql.escape(calories)}`;
    }

    // Check if protein parameter is provided
    if (protein) {
        query += ` AND protein = ${mysql.escape(protein)}`;
    }

    // Check if carbohydrates parameter is provided
    if (carbohydrates) {
        query += ` AND carbohydrates = ${mysql.escape(carbohydrates)}`;
    }

    // Perform the query to count total records
    connection.query(query, (error, countResults) => {
        if (error) {
            console.error('Error executing count query:', error);
            return res.status(500).send('Error counting total records');
        }

        // Calculate the total pages based on total records and limit
        const totalRecords = countResults[0].totalRecords;
        const totalPages = Math.ceil(totalRecords / limit);

        // Calculate the offset based on the current page number and limit
        const offset = (page - 1) * limit;

        // Construct the query to fetch paginated data
        let dataQuery = 'SELECT * FROM meals WHERE 1=1'; // Start with a base query

        // Add filters if provided
        if (calories) {
            dataQuery += ` AND calories = ${mysql.escape(calories)}`;
        }
        if (protein) {
            dataQuery += ` AND protein = ${mysql.escape(protein)}`;
        }
        if (carbohydrates) {
            dataQuery += ` AND carbohydrates = ${mysql.escape(carbohydrates)}`;
        }

        // Append LIMIT and OFFSET clauses for pagination
        dataQuery += ` LIMIT ${mysql.escape(limit)} OFFSET ${mysql.escape(offset)}`;

        // Perform the query to fetch paginated data
        connection.query(dataQuery, (error, results) => {
            if (error) {
                console.error('Error executing data query:', error);
                return res.status(500).send('Error fetching data from database');
            }

            // Construct the response object with the fetched data and total pages
            const responseData = {
                data: results,
                totalPages: totalPages
            };

            // Send the response as JSON
            res.json(responseData);
        });
    });
});



// Start the server
const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
