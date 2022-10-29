module.exports = (app) => {
	const todolist = require("../controllers/todo-list.js");
	var router = require("express").Router();

	router.get("/", todolist.findAll);
	router.post("/", todolist.create);
	router.put("/:id", todolist.update);
	router.delete("/:id", todolist.destroy);

	app.use('/api/todos', router);
};
