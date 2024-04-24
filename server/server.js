//be sure to have node version 20^
//use node --env-file= <>.env <>.js
const http=require('http') 


let server = http.createServer((request,response) => {
    const headers = {
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000, 
      };
    if (['GET', 'POST'].indexOf(request.method) > -1) {
        response.writeHead(200, headers);
        response.end('Hello World');
        return;
      }
    response.end()
})
server.listen(process.env.PORT)
console.log(`server listening port ${process.env.PORT}`)
