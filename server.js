const express = require("express");
const cors = require("cors");
const https = require("https");
const curl = require('curl');

const app = express();
const url = new URL('https://firebasestorage.googleapis.com/v0/b/gorgias-templates-production.appspot.com/o/attachments%2F3291ead6-82a2-43fa-ba6e-58328b4e02a1.json?alt=media&token=56fbe45a-2b91-4e35-bd1a-69f41f7d4363');


app.use(cors());

app.get("/", function (req, res) {
    let options = {};
    curl.get(url, options, function(err, response, body) {          
        res.status(200).json(JSON.parse(body));  
    });
})

app.listen(5000, () => {
    console.log("server listening to port 5000");
})