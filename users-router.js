// const {addUser, getUsers} = require("./repository");
//
// exports.usersController = async (req, res) => {
//   if (req.method === 'POST') {
//     let result = await addUser('new user')
//     res.write(JSON.stringify({success: true}))
//     res.end()
//   } else {
//     // getUsers(users => {
//     //   res.write(users)
//     //   res.end()
//     // })
//     let users = await getUsers()
//     res.write(JSON.stringify(users))
//     res.end()
//     //res.write(JSON.stringify(getUsers()))
//   }
// }

const {addUser, getUsers, deleteUser, getUser, updateUser} = require("./repository");
const express = require('express')

const router = express.Router()

//middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', async (req, res) => {
  let users = await getUsers(req.query.search)
  // if (!!req.query.search) {
  //   users = users.filter(u => u.name.includes(req.query.search))
  // }
  res.send(users)
});

router.get('/:id', async (req, res) => {
  let userId = req.params.id
  let user = await getUser(userId)
  //let user = users.find(u => u._id.toString() === userId)
  if (user) {
    res.send(user)
  } else {
    res.send(404)
  }
});

router.delete('/:id', async (req, res) => {
  let userId = req.params.id
  await deleteUser(userId)
  res.send(204)
});

router.put('/', async (req, res) => {
  let {name, id} = req.body
  await updateUser(id, name)
  res.send({success: true})
});

router.post('/', async (req, res) => {
  let name = req.body.name
  await addUser(name)
  res.send({success: true})
});

module.exports = router