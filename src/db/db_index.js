const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

/** Acceder a la base de datos */
async function getDBHandler(){ 
    try {
        const dbHandler = await open({
            filename: "todos.sqlite",
            driver: sqlite3.Database
        });

        if(!dbHandler){
            throw new TypeError(`DB Handler expected got ${dbHandler}`);
        }

        return dbHandler;

    } catch (error) {
        console.error(`Something went wrong when trying to create the DB Handler: ${error.message}`);
    }

}
/** Crear la base de datos */
async function initDB(){ 

    try {
        const dbHandler = await getDBHandler();

        await dbHandler.exec(
            `CREATE TABLE IF NOT EXISTS todos (
                id INTEGER PRIMARY KEY, 
                title TEXT, 
                description TEXT,
                is_done INTEGER DEFAULT 0,
                date TEXT
            )`
        );

        await dbHandler.close();
    } catch (error) {
        console.error(`There was an error trying to init the DB: ${error.message}`);
    }
}



module.exports.getDBHandler = getDBHandler;
module.exports.initDB = initDB;


//console.log(module)