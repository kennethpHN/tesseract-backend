# Tesseract Backend

Backend for the Software Dev. Fundamentals project - CoreCode.io

Requires Node.JS

run the command `npm install` to install the required dependencies.

Start the program with `npm start`.


Default port is 3000.

## REST API Reference

**GET - status**

`localhost:3000/status`

**GET - list of Todos**

`localhost:3000/to-dos/`

**POST - add a todo**

`localhost:3000/to-dos/<id>`

**PATCH - update a todo**

`localhost:3000/to-dos/<id>`

Body parameters:

```json
{
    title: string,
    description: string,
    is_done: integer (0-1)
}
```

**DELETE - remove a todo**

`localhost:3000/to-dos/<id>`