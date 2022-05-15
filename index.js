// let http = require('http');
//
// const {usersController} = require("./usersController");
//
// process.on('unhandledRejection', function(reason, p) {
//   console.log(reason)
// })
//
// let cors = (req, res) => {
//   //set CORS headers
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Request-Method', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'OPTION, GET');
//   res.setHeader('Access-Control-Allow-Headers', '*');
//   if (req.method === 'OPTIONS') {
//     res.writeHead(200)
//     res.end()
//     return true
//   }
//   return false
// }
//
// let server = http.createServer((req, res) => {
//   if (cors(req, res) === true) return
//
//   switch (req.url) {
//     case '/users':
//       usersController(req, res)
//       break
//     case '/tasks':
//       res.write('Tasks')
//       res.end()
//       break
//     default:
//       res.write('Page not found')
//       res.end()
//   }
// })
//
//server.listen(7542)

const express = require('express');
const users = require('./users-router')
const cors = require('cors')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')

//mongoose.connect('mongodb://localhost/users', {useNewUrlParser: true})
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mydb');
}

// let db = mongoose.connection
// db.on('error', console.error.bind(console, 'connection error:'))
// db.once('open', function() {})

const app = express();

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/users', users)

app.get('/tasks', async (req, res) => {
  res.send('Tasks')
});

app.use((req, res) => {
  res.send(404)
});

app.listen(7542, () => {
  console.log('Example app listening on port 7542')
})