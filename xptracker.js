const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const port = process.env.PORT || app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));

let xp = 0;

function updateXp(command, value) {
    switch (command) {
      case "ADD":
        return (xp += value);
      case "SUBTRACT":
        return (xp -= value);
      case "SET":
        return (xp = value);
      case "GET":
        return xp;
      default:
        return help;
    }
}

function getLevel(xp) {
    if (xp >= 335000) {
        return 20;
    }
    if (xp >= 305000) {
        return 19;
    }
    if (xp >= 265000) {
        return 18;
    }
    if (xp >= 225000) {
        return 17;
    }
    if (xp >= 195000) {
        return 16;
    }
    if (xp >= 165000) {
        return 15;
    }
    if (xp >= 140000) {
        return 14;
    }
    if (xp >= 120000) {
        return 13;
    }
    if (xp >= 100000) {
        return 12;
    }
    if (xp >= 85000) {
        return 11;
    }
    if (xp >= 64000) {
        return 10;
    }
    if (xp >= 48000) {
        return 9;
    }
    if (xp >= 34000) {
        return 8;
    }
    if (xp >= 23000) {
        return 7;
    }
    if (xp >= 14000) {
        return 6;
    }
    if (xp >= 6500) {
        return 5;
    }
    if (xp >= 2700) {
        return 4;
    }
    if (xp >= 900) {
        return 3;
    }
    if (xp >= 300) {
        return 2;
    }
    else {
        return 1;
    }
}
app.get("/", (req, res) => { res.send(JSON.stringify('BEEP BOOP'))})

app.post("/", (req, res) => {
    let args = req.body.text.split(" ");
    let command = args[0].toUpperCase();
    let value = args[1] ? parseInt(args[1]) : 0;
    let xp = updateXp(command, value);
    let level = getLevel(xp);
    res.status(200)

    if (command === 'HELP') {
        res.send(JSON.stringify("Invalid Command. Please use add [value], subtract [value], set [value] or get [value]"));
        break;
    }

    res.send(JSON.stringify(`Current XP: ${xp} | Current Level: ${level}`))

});

app.listen(port, () => console.log(`Listening on port ${port}!`))
