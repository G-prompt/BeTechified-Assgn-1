const { v4: uuid } = require('uuid');
const todos = require('../data/todos');


// GET all todos
exports.getTodos = (req, res) => {
    res.json(todos);
};
// GET single todo (single read)
exports.getTodoById = (req, res) => {
    const todo = todos.find(t => t.id === req.params.id);
    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
};


// GET active todos (array bonus)
exports.getActiveTodos = (req, res) => {
    const activeTodos = todos.filter(t => t.completed === false);
    res.json(activeTodos);
};


// POST create todo (with validation)
exports.createTodo = (req, res) => {
    const { task } = req.body;


    if (!task || task.trim() === '') {
        return res.status(400).json({ message: 'Task field is required' });
    }


    const newTodo = {
        id: uuid(),
        task,
        completed: false
    };


    todos.push(newTodo);
    res.status(201).json(newTodo);
};


// PUT update todo
exports.updateTodo = (req, res) => {
    const todo = todos.find(t => t.id === req.params.id);


    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }


    const { task, completed } = req.body;


    if (task !== undefined) todo.task = task;
    if (completed !== undefined) todo.completed = completed;


    res.json(todo);
};


// DELETE todo
exports.deleteTodo = (req, res) => {
    const index = todos.findIndex(t => t.id === req.params.id);


    if (index === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }


    todos.splice(index, 1);
    res.json({ message: 'Todo deleted successfully' });
};