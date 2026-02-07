const express = require('express');
const todoRoutes = require('./routes/todo.routes');


const app = express();


app.use(express.json());
app.use('/api/todos', todoRoutes);


app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});


module.exports = app;