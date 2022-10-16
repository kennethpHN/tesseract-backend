const { response } = require('express');
const express = require('express');
const {getDBHandler} = require('../db/db_index');
const TodosReqHandler = express.Router();

TodosReqHandler.post("/to-dos", async (req,res) => {
    try {
        const {title, description, isDone: is_done} = req.body;
        const dbHandler = await getDBHandler();

        const addTodo = await dbHandler.run(`
        INSERT INTO todos (title, description, is_done)
        VALUES (
            '${title}',
            '${description}',
            ${is_done}
        )
    `);

        await dbHandler.close();
        res.send({addTodo:{title,description,is_done, ...addTodo}});
    } catch (error) {
        res.status(500).send({
            error: `Something went wrong when trying to create a new todo`,
            errorInfo: error.message,
        });
    }
});

TodosReqHandler.get("/to-dos", async (req,res) => {
    try {
        const dbHandler = await getDBHandler();
        const listToDos = await dbHandler.all("SELECT * FROM todos");
        await dbHandler.close();

        if(!listToDos || !listToDos.length){
            return response.status(404).send({message: "To Dos not found"});
        }

        res.send({listToDos});
    } catch (error) {
        res.status(500).send({
            error: `Something went wrong when trying to create a new todo`,
            errorInfo: error.message,
        });
    }
});

module.exports.TodosReqHandler = TodosReqHandler;