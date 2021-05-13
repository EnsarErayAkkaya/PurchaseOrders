const express = require("express");
const cors = require("cors");
const curl = require('curl'); // this package is the magic here

const app = express();
const url = new URL('https://firebasestorage.googleapis.com/v0/b/gorgias-templates-production.appspot.com/o/attachments%2F3291ead6-82a2-43fa-ba6e-58328b4e02a1.json?alt=media&token=56fbe45a-2b91-4e35-bd1a-69f41f7d4363');


app.use(cors());

// When a get request recieved send Get request to given url and return what return from it 
app.get("/", function (req, res) {
    let options = {}; // no need to add any option
    // curl gets attached file
    curl.get(url, options, function(err, response, body) {          
        res.status(200).json(JSON.parse(body));  
    });
})

// server started
app.listen(5000, () => {
    console.log("server listening to port 5000");
})