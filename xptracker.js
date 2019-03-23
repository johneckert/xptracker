const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const port = 3001


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

app.get('/', (req, res) => res.send('GET!'))

let xp = 0

app.post("/", (req, res) => {
    xp += parseInt(req.body.xp)
    console.log(xp)
    res.send(JSON.stringify(xp))
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))