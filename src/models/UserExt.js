/**
 * 用户扩展信息
 */

const { Schema, model } = require('mongoose')

const UserExtSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' }, // 用户id
  billGroup: { type: Array, default: [] }, // 账单分组
  budget: { type: Number }, // 每月预算
  date: { type: Date, default: Date.now } // 日期
})

module.exports = model('UserExt', UserExtSchema)