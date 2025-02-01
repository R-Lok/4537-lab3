 
 //import node libraries
const http = require('http');
const fs = require('fs')
const url = require('url')

//import my own modules/localizations
const dt = require('./modules/utils')
const lang = require('./lang/en/en.json')

//set up server endpoints
const server = http.createServer(function (req, res) {
    const reqParams = url.parse(req.url, true)

    if(reqParams.pathname === '/l3/getDate/') {
        const str = lang.greetingFormat.replace('%1', reqParams.query.name ? reqParams.query.name : lang.greetingDefaultName) + dt.getDate() 
        res.writeHead(200, {'Content-type': 'text/html'})
        res.end(`<p style='color: blue;'> ${str} </p>`)
    } 

    else if(reqParams.pathname === '/l3/writeFile/') 
    {
        handleWrite(req, res, reqParams.query.text)
    }
    
    else if(reqParams.pathname.includes('/l3/readFile/')) 
    {
        const fileName = req.url.split('/readFile/')[1]

        handleRead(req, res, fileName)
    }
    else
    {
        res.writeHead(404, {'Content-type': 'text/html'})
        res.end(`<p> ${lang.resourceNotFound} </p>`)
    }
})

//start listening on server
server.listen(8000);

console.log("Server is running and listening")

function handleWrite(req, res, arg) {
    if (!arg) {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end(`<p>${lang.badRequestNoArg} "text"</p>`);
    } else {
        fs.appendFile('file.txt', arg, (err) => {
            if (err) {
                res.writeHead(500, {'Content-type': 'text/html'})
                res.end(`<p> ${lang.internalServerError}`)
            } else {
                res.writeHead(200, {'Content-type': 'text/html'})
                res.end(`<p> ${lang.writeOk} </p>`)
            }
        })
    }
}

function handleRead(req, res, fileName) {
    fs.readFile(fileName, 'utf-8', (err, data) => {
        if(err) {
            res.writeHead(err.errno === -2 ? 404:500, {'Content-type': 'text/html'})
            res.end(err.errno === -2 ? `<p> ${lang.resourceNotFound}${fileName != ''? ': ' + fileName : ''} ` : `<p> ${lang.internalServerError} </p>`)
        } else {
            res.writeHead(200, {'Content-type': 'text/plain'})
            res.end(`${data}`)
        }
    })
}