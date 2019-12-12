const http = require('http');
const port = 3000;
const contentDir = "./content/";
const fs = require("fs");
const getFiles = require('../readerDirFiles');
const checkFilesType = require('../checkFilesType');
const renderFiles = require('../render');
require('handlebars');
var mime = require('mime');


const server = http.createServer((req, res) => {
    if (req.url === "/") {
        const url = "./" + req.url.slice(contentDir.length - 2);
        res.writeHead(200, { "Content-Type": "text/html" });
        fs.readFile(contentDir + "index.html", (error, data) => {
            if (error) {
                res.writeHead(404);
                res.write("Error: File Not Found");
            } else {
                res.write(data);

            }
            res.end(renderFiles(checkFilesType(getFiles(contentDir))));
        });
    } else if (req.method === "GET" && req.url !== '/favicon.ico') {
        const fileName = getFileName(req.url);
        const filePath = getPath(req.url);
        const stats = fs.statSync(filePath);
        const size = stats.size;
        readApp(req, res, size, filePath, fileName);

    } else if (req.method === "DELETE") {
        const filePath = getPath(req.url);
        fs.unlink(filePath, function(err) {
            if (err) throw err;
            console.log('file deleted');
        });
    }
});

server.listen(port, (error) => {
    if (error) {
        console.log('Something wrong - ', error);
    } else {
        console.log('Listening ', port);
    }
});
function getFileName(url) {
    const pathArr = url.split("/");
    return pathArr[pathArr.length-1];
}

function getPath(url) {
    return "./content" + url;
}
function readApp(req,res, size, filePath, file) {

    fs.exists(filePath, function(exists){
        if (exists) {
            res.writeHead(200, {
                "Content-Type": mime.getType(filePath),
                "Content-Disposition" : "attachment; filename=" + file});

            const stream = fs.createReadStream(filePath);
            stream.pipe(res);
        } else {
            res.writeHead(400, {"Content-Type": "text/plain"});
            res.end("ERROR File does NOT Exists.ipa");
        }
    });
}

