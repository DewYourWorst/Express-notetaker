const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.use(require("./routes/api.routes"));
app.use(require("./routes/html.routes"));

app.listen(PORT, () => console.log(`Express server currently running on port: ${PORT}`))