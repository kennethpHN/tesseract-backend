// const {initDB} = require("./db/db_index.js");

// initDB().then(()=>{
//     console.log("DB Created: ");
// })

const express = require('express');
const { initDB } = require('./db/db_index');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(3000, ()=>{
    console.log("app running: ");
    initDB().then(()=>{
        console.log("DB Ready: ");

    });
});