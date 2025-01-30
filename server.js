 
 //import node libraries
const http = require('http');
const fs = require('fs')
const url = require('url')
const path = require('path')

//import my own modules/localizations
const dt = require('./modules/utils')
const lang = require('./lang/en/en')

//set up server endpoints
const server = http.createServer(function (req, res) {
    const reqParams = url.parse(req.url, true)

    if(reqParams.pathname === '/COMP4537/labs/3/getDate/') {
        const str = lang.greetingFormat.replace('%1', reqParams.query.name ? reqParams.query.name : 'Person') + dt.getDate() 
        res.writeHead(200, {'Content-type': 'text/html'})
        res.end(`<p style='color: blue;'> ${str} </p>`)
    } 

    else if(reqParams.pathname === '/COMP4537/labs/3/writeFile/') 
    {

    }
    
    else if(reqParams.pathname.includes('/COMP4537/labs/3/readFile/')) 
    {
        const fileName = req.url.split('/readFile/')[1]

        fs.readFile(fileName, 'utf-8', (err, data) => {
            if(err) {
                res.writeHead(err.errno === -2 ? 404:500, {'Content-type': 'text/html'})
                res.end(err.errno === -2 ? `<p> ${fileName != ''? fileName : 'Resource'} Not Found </p>` : '<p> Internal Server Error </p>')
            } else {
                res.writeHead(200, {'Content-type': 'text/plain'})
                res.end(`${data}`)
            }
        })
    }
    else
    {
        res.writeHead(404, {'Content-type': 'text/html'})
        res.end(`<p> Resource Not Found </p>`)
    }
})

//start listening on server
server.listen(8000);


console.log("Server is running and listening")