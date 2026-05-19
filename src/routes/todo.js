const express = require("express");
const { createTodo, getAllTodos, getSingleTodo, updateTodo, deleteTodo } = require("../controller/todo");


const router = express.Router();

router.post("/", createTodo);
router.get("/", getAllTodos);
router.get("/:id", getSingleTodo);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);






module.exports = router;