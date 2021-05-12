const express = require("express");
const cors = require("cors");
const https = require("https");

const app = express();
const url = new URL('https://firebasestorage.googleapis.com/v0/b/gorgias-templates-production.appspot.com/o/attachments%2F3291ead6-82a2-43fa-ba6e-58328b4e02a1.json?alt=media&token=56fbe45a-2b91-4e35-bd1a-69f41f7d4363/56fbe45a-2b91-4e35-bd1a-69f41f7d4363');


app.use(cors());

app.get("/", function (req, res) {
    const options = {
        hostname: url.host,
        method: 'GET',
        path: url.pathname
      }
  
      https.get(options, (resp) => {
        let data = '';
        console.log("statusCode: ", resp.statusCode);
        console.log("headers: ", resp.headers);

  
        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            process.stdout.write(data);
            data += chunk;
        });
  
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            
            res.status(200).json(data);
        });
  
      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });
})

app.listen(5000, () => {
    console.log("server listening to port 5000");
})