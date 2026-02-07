const express = require('express');
const path = require('path');

require('dotenv').config();
//import express from 'express';
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/.', (req, res) => {
    res.send('My Week 2 API');
})
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});




app.post('/user', (req, res) => {
    try {
        const { name, email } = req.body;

        res.send(`Hello ${name}`)
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
})

app.post('/user/:id', (req, res) => {
    const { id } = req.params;
    res.send(`User ${id} profile`);
    console.log('Id: ', id);

})


app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Cannot ${req.method} ${req.url}`
    });
});


app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
});

//const app = require('./app');


app.listen(PORT, () => {
    console.log(`Todo API running on port ${PORT}`);
});