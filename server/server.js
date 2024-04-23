const {createServer} = require("http")
const callback = (request,response) => {
    request.end()
}
let server = createServer((request,response) => callback)

server.listen(process.env.PORT)
console.log(`listening port ${process.env.PORT}`)
