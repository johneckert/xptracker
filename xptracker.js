const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const port = process.env.PORT || app.use(bodyParser.urlencoded({ extended: false }));
//const port = 9091
const config = require('./config')
const apiKey = process.env.AIRTABLE || config.airtable;

var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: apiKey
});
var base = Airtable.base('appntcNcyTVBPTsvd');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));

function updateXp(command, value, oldXp) {
    let newXp;
    switch (command) {
      case "ADD":
        newXp = oldXp += value;
        updateAirTable(newXp);
        return newXp;
      case "SUBTRACT":
        newXp = oldXp -= value;
            updateAirTable(newXp);
        return newXp;
      case "SET":
        newXp = value;
        updateAirTable(newXp);
        return newXp;
      case "GET":
        return oldXp;
      default:
        return help;
    }
}

function updateAirTable(newXp) {
    base('stdXp').update("recBYdyEXSHOdoO6f", 
        {"XP": newXp, "Level": getLevel(newXp)}, 
        function (err, record) {
            if (err) {
                console.error(err);
                return;
            }
        }
    );
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
    let currentXp, level;
    res.status(200)

    if (command === 'HELP') {
        res.send(JSON.stringify("Please use add [value], subtract [value], set [value] or get [value]"));
    } 
    else {
        // get record
    base('stdXp').find('reclFy0QG6sGDICKc', function (err, record) {
        if (err) { 
            console.error('err:', err); 
            return; 
        }
        level = record.fields.Level
        currentXp = record.fields.XP
        });


        let value = args[1] ? parseInt(args[1]) : 0;
        let newXp = updateXp(command, value, currentXp);

        res.send(JSON.stringify(`Current XP: ${newXp} | Current Level: ${level}`))
    }


});

app.listen(port, () => console.log(`Listening on port ${port}!`))
