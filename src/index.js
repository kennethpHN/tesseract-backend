// const {initDB} = require("./db/db_index.js");

// initDB().then(()=>{
//     console.log("DB Created: ");
// })

const express = require('express');
const { initDB } = require('./db/db_index');
const { TodosReqHandler } = require('./handlers/todos');
var cors = require('cors');
const app = express();

app.use(cors())
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