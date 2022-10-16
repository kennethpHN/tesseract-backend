// const {initDB} = require("./db/db_index.js");

// initDB().then(()=>{
//     console.log("DB Created: ");
// })

const express = require('express');
const { initDB } = require('./db/db_index');
const { TodosReqHandler } = require('./handlers/todos');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(TodosReqHandler);
app.get("/status",(req, res)=>{
    res.send({status: "OK"});
});

app.listen(3000, ()=>{
    console.log("app running: ");
    initDB().then(()=>{
        console.log("DB Ready: ");

    });
});