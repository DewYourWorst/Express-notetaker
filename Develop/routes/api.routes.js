const fs = require("fs")
const generateUniqueId = require("generate-unique-id");

const updateNote = (updatedNotesField) => {
    fs.writeFile("./db/db.json", JSON.stringify(updatedNotesField), (err) => {
        if (err) throw (err);
    });
};

module.exports = (app) => {
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
            const notes = JSON.parse(data);
            newNote.id = generateUniqueId({length: 10});
            notes.push(newNote);


            updateNote(notes);

            console.log(
                `A Note has been Added!
                  Here is the Title: ${JSON.stringify(newNote.title)},
                  Here is the Text: ${JSON.stringify(newNote.test)}, 
                  And the ID: ${newNote.id}`
                  );

            res.send(notes)
        });
    });

    app.delete("/api/notes/:id", (req, res) => {
        const deleteId = req.params.id;
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            let notes = JSON.parse(data);
            for (let i = 0; i < notes.length; i++) {
                if (notes[i].id === deleteId) {
                    notes.splice(i, 1);
                }
            }
            updateNote(notes);
            console.log(`The Note ${deleteId} has been deleted!`);
            res.send(notes)
        });
    });

    app.put("/api/notes/:id", (req, res) => {
        const editId = req.params.id;
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            let notes = JSON.parse(data);
            let selectNote = notes.find((note) => note.id === editId);

            if(selectNote) {
                let updatedNote = {
                    title: req.body.title,
                    text: req.body.text,
                    id: selectNote.id,
                };
                let targetIndex = notes.indexOf(selectNote);
                notes.splice(targetIndex, 1, updatedNote);

                res.sendStatus(204)
                updateNote(notes)
                res.json(notes)
            } else {
                res.sendStatus(404);
            }
        })
    })
}