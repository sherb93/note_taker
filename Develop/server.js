// Brings in required modules from exports
const express = require("express");
const fs = require("fs"); // file sharing module
const path = require("path"); // Easier than relative pathing everything
const { v4: uuidv4 } = require("uuid"); // Creates unique ID for each note
const notesDB = require("./db/db.json") // ******WHY****** does requring this with no exports make .json read it correctly in .get api/notes??

// If 3002 isn't available it finds an open port to use
const PORT = process.env.PORT || 3002;

// App variable for running express
const app = express();

// THESE ARE CRUCIAL FOR POST AND PUT REQUESTS - FIGURE OUT ****WHY*****
// Before adding these middlewares, the req.body from the post fetch was undefined
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// *****WHY****** do we use this? I understand what it does but don't understand its benefits
app.use(express.static("public"));

// Responds with notes.html when /notes URL is requested
app.get("/notes", (req, res) => {
    console.log(`GET REQUEST AT ${req.path} MADE`)
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

// Routes for /api/notes. Fetch requests are made through this path to gather notes data from db.json
app
    .route("/api/notes")
    .get((req, res) => {
        console.log(`GET REQUEST AT api/notes MADE`)
        res.json(notesDB);
    })
    .post((req, res) => {
        console.log(`${req.method} has been receieved`);
        console.info(req.body.title);
        const { title, text } = req.body; // Make a copy of the req so we aren't mutating the original

        // If all required properties are present then make copy with uuid
        if (title && text) {
            const newNote = {
                title,
                text,
                id: uuidv4()
            };

            fs.readFile("./db/db.json", "utf8", (err, data) => {
                if (err) {
                    console.error(err);
                } else {
                    const parsedNotes = JSON.parse(data);
    
                    parsedNotes.push(newNote)

                    fs.writeFile("./db/db.json", JSON.stringify(parsedNotes, null, 4), writeErr =>
                    writeErr
                        ? console.error(writeErr)
                        : console.log("Successfully updated reviews")
                    );
                };
            });

            const response = {
                status: "success",
                body: newNote
            };

            res.status(201).json(response);
            console.log("Response: " + JSON.stringify(newNote))
        } else {
            res.status(500).json("Error in posting note");
        }

    });

// Dedicated route for all url's that don't exist after our root
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"))
})

// Binds the connections on the specified host and port AKA starts app.
app.listen(PORT, () => {
    console.log(`Express server listening on port http://localhost:${PORT}`)
});
