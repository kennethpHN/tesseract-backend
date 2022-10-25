const express = require('express');
const {getDBHandler} = require('../db/db_index');
const TodosReqHandler = express.Router();

TodosReqHandler.post("/to-dos", async (req,res) => {
    try {
        date = new Date();
        const {title, description, isDone: is_done} = req.body;
        const dbHandler = await getDBHandler();

        const addToDo = await dbHandler.run(`
        INSERT INTO todos (title, description, is_done, date)
        VALUES (
            '${title}',
            '${description}',
            0,
            '${date.toLocaleString('en-US', { timeZone: 'America/Tegucigalpa' })}'
        )
    `);

        await dbHandler.close();
        
        res.send({addToDo:{title,description,is_done,date, ...addToDo}});
    } catch (error) {
        res.status(500).send({
            error: `Something went wrong when trying to create a new ToDo`,
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
            return response.status(404).send({message: "ToDos not found"});
        }

        res.send({listToDos});
    } catch (error) {
        res.status(500).send({
            error: `Something went wrong when trying to list the ToDos`,
            errorInfo: error.message,
        });
    }
});

TodosReqHandler.delete("/to-dos/:id", async (req,res) => {
    try {
        const toDoId = req.params.id;
        const dbHandler = await getDBHandler();
        const deleteToDo = await dbHandler.run(
            "DELETE FROM todos WHERE id = ?",
            toDoId
        );
        await dbHandler.close();
        
        res.send({toDoRemoved: {...deleteToDo}});

    } catch (error) {
        res.status(500).send({
            error: `Something went wrong when trying to delete the selected ToDo`,
            errorInfo: error.message,
        });
    }
});


TodosReqHandler.patch("/to-dos/:id", async (req,res) => {
    try {
        let updatedDate = new Date();
        const toDoId = req.params.id;
        const {title, description, is_done} = req.body;
        const dbHandler = await getDBHandler();

        const selectedToDo = await dbHandler.get(
            `SELECT * FROM todos WHERE id = ?`,
            toDoId
        );

        let boolIsDone = is_done ? 1 : 0;

        const updateToDo = await dbHandler.run(
            `UPDATE todos
            SET title = ?,
                description = ?,
                is_done = ?,
                date = ?
            
            WHERE
                id = ?`,
                [title|| selectedToDo.title , description || selectedToDo.description, boolIsDone, updatedDate.toLocaleString('en-US', { timeZone: 'America/Tegucigalpa' }), toDoId]
                );
        await dbHandler.close();
        
        res.send({updatedToDo: {...selectedToDo}});

    } catch (error) {
        res.status(500).send({
            error: `Something went wrong when trying to update the selected ToDo`,
            errorInfo: error.message,
        });
    }
});


module.exports.TodosReqHandler = TodosReqHandler;