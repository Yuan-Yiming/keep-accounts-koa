/**
 * 用户表
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  // 用户名称
  name: {
    type: String,
    require: true
  },
  // 邮箱
  email: {
    type: String,
    require: true
  },
  // 密码
  password: {
    type: String,
    require: true
  },
  // 头像
  avatar: {
    type: String
  },
  // 注册日期
  date: {
    type: Date,
    default: Date.now // 函数？
  }
})

module.exports = mongoose.model('User', UserSchema)