const Todo = require("../models/todo");



// Adding a new task (C)
const createTodo = async (req, res) => {
    try {
        const todo = new Todo(req.body);
        await todo.save();
        return res.status(200).json({
        status: true,
        message: "Task added Successfully",
        todo 
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: error.message });
    }
};




// Getting All Tasks (R)
const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        return res.status(200).json({
            status: true,
            message: "Tasks gotten successfully",
            todos,
           count: todos.length,
        });

    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};




// Getting Single Task (R)
const getSingleTodo = async (req, res) => {
    try {
        const todoGet = await Todo.findById(req.params.id);

        if (!todoGet) {
        return res.status(404).json({ status: false, message: "Task not found" });
        }

        res.status(200).json({ 
        status: true, 
        message: "Single task gotten successfully", 
        todo: todoGet
    });

    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};




// Updating a Task (U)

const updateTodo = async (req, res) => {

    try {
        const updatedTask = await Todo.findByIdAndUpdate(
            req.params.id,   //which task to update
            req.body,        //new data for the task
            { new: true }    // return updated version fr task
        );  

        if (!updatedTask) {
            return res.status(404).json({ status: false, message: "Task not found" });
        }

        res.status(200).json({ 
            status: true, 
            message: "Task updated successfully", 
            todo: updatedTask 
        });

    } catch (error) {
        console.log(error);
        
        res.status(500).json({ status: false, message: error.message });
    }
};



// Deleting a Task (D)
const deleteTodo = async (req, res) => {

    try {
          const deletedTask = await Todo.findByIdAndDelete(req.params.id);

        if (!deletedTask) {
        return res.status(404).json({ status: false, message: " Delete failed! Task not found" });
        }

        return res.status(200).json({ status: true, message: "Task deleted" , deletedTask});

    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

module.exports = { createTodo, getSingleTodo, getAllTodos, updateTodo, deleteTodo };