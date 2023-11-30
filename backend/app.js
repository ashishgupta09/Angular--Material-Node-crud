const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/users');

app.use(express.json());
app.use(cors());

// Use the user routes
app.use('/', userRoutes);

// Define a catch-all route for 404 (Not Found) errors
app.use((req, res) => {
    res.status(404).send('Route not found');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});