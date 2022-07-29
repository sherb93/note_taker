const router = require("express").Router();
const fs = require("fs"); // file sharing module
const { v4: uuidv4 } = require("uuid"); // Creates unique ID for each note
const savedNotes = require("../db/db.json");

router
  .route("/notes")
  .get((req, res) => {
    console.log(`GET REQUEST AT api/notes MADE`);
    res.json(savedNotes);
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
        id: uuidv4(),
      };

      fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const parsedNotes = JSON.parse(data);

          parsedNotes.push(newNote);

          fs.writeFile(
            "./db/db.json",
            JSON.stringify(parsedNotes, null, 4),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.log("Successfully updated reviews")
          );
        }
      });

      const response = {
        status: "success",
        body: newNote,
      };

      res.status(201).json(response);
      console.log("Response: " + JSON.stringify(newNote));
    } else {
      res.status(500).json("Error in posting note");
    }
  });

module.exports = router;
