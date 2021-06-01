/**
 * 用户表
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now // 函数？
  }
})

module.exports = mongoose.model('User', UserSchema)