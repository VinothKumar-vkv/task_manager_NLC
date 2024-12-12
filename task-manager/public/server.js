const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Create an Express app
const app = express();

// Middleware
app.use(bodyParser.json());  // Parse JSON bodies

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Replace with your MySQL username
    password: 'rootpassword',  // Replace with your MySQL password
    database: 'task_manager'  // Your database name
});

// Connect to MySQL database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL');
});

// Endpoint to add task to the database
app.post('/addTask', (req, res) => {
    const { username, task, dueDate } = req.body;

    // Insert task data into the admin_tasks table
    const query = 'INSERT INTO admin_tasks (username, task, due_date) VALUES (?, ?, ?)';
    db.query(query, [username, task, dueDate], (err, result) => {
        if (err) {
            console.error('Error inserting task into database:', err);
            return res.status(500).json({ message: 'Error saving task' });
        }
        res.status(200).json({ message: 'Task added successfully' });
    });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
