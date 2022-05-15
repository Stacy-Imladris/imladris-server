//const {readJsonFromFile, writeJsonToFile} = require("./fs-utils");
const mongoose = require("mongoose");
const {Schema} = require("mongoose");

//const getUsers = () => users
// const userSchema = new mongoose.Schema({
//   name: String
// });

const User = mongoose.model('user', new Schema({name: String}));

const getUsers = (search) => {
  if (!search) {
    return User.find()
  } else {
    return User.find({name: new RegExp(search)})
  }
  //readJsonFromFile('users.json')
}

const getUser = (id) => {
  return User.find({_id: id})
}

const addUser = name => {
  const user = new User({name});
  return user.save()
  // let users = await getUsers()
  // users.push({"id": users.length + 1, name})
  // return writeJsonToFile('users.json', users)
}

const deleteUser = id => {
  return User.deleteOne({_id: id})
}

const updateUser = (id, name) => {
  return User.updateOne({_id: id}, {name})
}

exports.getUsers = getUsers
exports.getUser = getUser
exports.addUser = addUser
exports.deleteUser = deleteUser
exports.updateUser = updateUser