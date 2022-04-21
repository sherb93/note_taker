const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const notesDB = require("./db/db.json")

const PORT = process.env.PORT || 3002;

const app = express();

app.use(express.static("public"));


app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app
    .route("/api/notes")
    .get((req, res) => {
        res.json(notesDB);
        // fs.readFile("./db/db.json", "utf8", (err, data) => {
        //     if (err) {
        //         console.error(err);
        //     } else {
        //         res.json(data);
        //     }
        // });
    })
    // .post((req, res) => {
    //     const {}
    // })

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"))
})

app.listen(PORT, () => {
    console.log(`Express server listening on port http://localhost:${PORT}`)
});