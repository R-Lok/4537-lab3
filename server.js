 
 //import node libraries
const http = require('http');
const url = require('url')

//import my own modules/localizations
const lang = require('./lang/en/en.json')
const l3 = require('./modules/l3')

//set up server endpoints
const server = http.createServer(function (req, res) {
    const reqParams = url.parse(req.url, true)

    if(req.url.startsWith('/l3')) {
        l3.handle_l3(reqParams, req, res)
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