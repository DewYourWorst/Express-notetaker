const fs = require("fs")
const generateUniqueId = require("generate-unique-id");
const app = require("express").Router()
const editNote = (updatedNotesField) => {
    fs.writeFile("./db/db.json", JSON.stringify(updatedNotesField), (err) => {
        if (err) throw (err);
    });
};

//module.exports = (app) => {
    app.get("/api/notes", (req, res) => {
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            res.json(JSON.parse(data))
        });
    });

    app.post("/api/notes", (req, res) => {
        const newNote = req.body;
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            const notesArr = JSON.parse(data);
            newNote.id = generateUniqueId({length: 10});
            notesArr.push(newNote);


            editNote(notesArr);

            console.log(
                `A Note has been Added!
                  Here is the Title: ${JSON.stringify(newNote.title)},
                  Here is the Text: ${JSON.stringify(newNote.text)}, 
                  And the ID: ${newNote.id}`
                  );

            res.send(notesArr)
        });
    });


    app.put("/api/notes/:id", (req, res) => {
        const editId = req.params.id;
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            let notesArr = JSON.parse(data);
            let selectedNote = notesArr.find((note) => note.id === editId);

            if(selectedNote) {
                let updatedNote = {
                    title: req.body.title,
                    text: req.body.text,
                    id: selectNote.id,
                };
                let targetIndex = notes.indexOf(selectedNote);
                notesArr.splice(targetIndex, 1, updatedNote);

                res.sendStatus(204)
                updateNote(notesArr)
                res.json(notesArr)
            } else {
                res.sendStatus(404);
            }
        })
    })
//}
module.exports = app