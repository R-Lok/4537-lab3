 
const http = require('http');
const fs = require('fs')
const url = require('url')
const dt = require('./modules/utils')
const lang = require('./lang/en/en')


const server = http.createServer(function (req, res) {
    const reqParams = url.parse(req.url, true)

    if(reqParams.pathname === '/COMP4537/labs/3/getDate/') {
        const str = lang.greetingFormat.replace('%1', reqParams.query.name ? reqParams.query.name : 'Person').replace('%2', dt.getDate())
        res.writeHead(200, {'Content-type': 'text/html'})
        res.end(`<p style='color: blue;'> ${str} </p>`)
    }

})

server.listen(8000);


console.log("Server is running and listening")