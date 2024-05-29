const http=require('http') 
const mongoose = require("mongoose")
const { MongoClient, ServerApiVersion } = require('mongodb')
const { resolve } = require('node:path/win32')

mongoose.set("strictQuery", false)

const user = process.env.USERNAME
const psw = process.env.PASSWORD




const uri = `mongodb+srv://${user}:${psw}@dbscheduleassistantapp.crk25lh.mongodb.net/?retryWrites=true&w=majority&appName=DBScheduleAssistantApp`


const group_schema = mongoose.Schema({
  group_name: String,
  members: [String],
  events: [String],
})
const Group = mongoose.model("Group", group_schema)

DBConnect().catch((err) => console.log(err))
async function DBConnect() {
  await mongoose.connect(uri)
}
const db_connection = mongoose.connection
db_connection.on("error", (err) => console.log(err))


const DBAddNewGroup = async (new_group) =>{
  try{
    await Group.create(new_group)
  } catch (error) {console.log(error)}
}
const DBReplaceGroup = async (cod,new_group) =>{
  try{
    await Group.replaceOne({_id : cod}, new_group)
  } catch (error) {console.log(error)}
}
const DBDeleteGroup = async (group_to_del) =>{
  try{
    await Group.deleteOne(group_to_del)
  } catch (error) {console.log(error)}
}
const DBFindGroupByMember = async (member) =>{
  try{
    let arr_matches = await Group.find({members : `${member}`})
    let group_arr_matches = arr_matches.map((document) => {
      document = document.group_name
    })
    console.log(group_arr_matches)
    return groups_arr_matches
  } catch (error) {console.log(error)}
}

let server = http.createServer((req,res) => {
    const headers = {
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000, 
      }
    if (req.method == 'POST') {
        res.writeHead(200, headers)
        res.write('ADD OR UPDATE GROUP')

        let body = ''
        req.on('data', (chunk) => {
            body += chunk;
        })
        req.on('end', async() => {
          let new_group = JSON.parse(body)

          let cod = await Group.exists({group_name:new_group.group_name})
          if(cod)
            DBReplaceGroup(cod,new_group)
          else
            DBAddNewGroup(new_group)
        })
      }
    if (req.method == 'GET') {
      res.writeHead(200, headers)
      res.write('GET GROUPS BY MEMBER')
      let body = ''
        req.on('data', (chunk) => {
            body += chunk;
      })
      req.on('end', async() => {
        let body = JSON.parse(body)
        let member = body.member
        let group_arr_matches = DBFindGroupByMember(member)
        res.write(JSON.stringify(group_arr_matches))
      })
    }
    if (req.method == 'DELETE') {
      res.writeHead(200, headers)
      res.write('DELETE GROUP')
      let body = ''
        req.on('data', (chunk) => {
            body += chunk;
        })
        req.on('end', async() => {
          let group_to_del = JSON.parse(body)
          DBDeleteGroup(group_to_del)
        })
    }
    res.end()
})
server.listen(process.env.PORT)
console.log(`server listening port ${process.env.PORT}`)