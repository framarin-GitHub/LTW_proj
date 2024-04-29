//be sure to have node version 20^
//use node --env-file= <>.env <>.js
const http=require('http') 


let server = http.createServer((request,response) => {
    const headers = {
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000, 
      }
    if (request.method == 'POST') {
        response.writeHead(200, headers)
        response.write('post method')

        let body = ''
        request.on('data', (chunk) => {
            body += chunk;
        })
        request.on('end', () => {
          console.log(JSON.parse(body))
          response.end()
        })
      }
    if (request.method == 'GETs') {
      response.writeHead(200, headers);
      response.write('get method hello world')
    }
    response.end()
})
server.listen(process.env.PORT)
console.log(`server listening port ${process.env.PORT}`)
