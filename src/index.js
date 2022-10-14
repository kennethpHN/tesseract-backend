const {initDB} = require("./db/index.js");

initDB().then(()=>{
    console.log("DB Created: ");
})