const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.static("public"));


app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            res.send(data);
        }
    });
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"))
})

app.listen(PORT, () => {
    console.log(`Express server listening on port https://localhost:${PORT}`)
});