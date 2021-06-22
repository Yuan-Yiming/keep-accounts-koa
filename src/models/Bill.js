/**
 * 账单表
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BillSchema = new Schema({
  // 关联用户
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  // 金额（正数）
  money: { type: Number, require: true },
  // 是否为收入
  isIncome: { type: Boolean, default: false },
  // 账单分组
  group: String,
  // 备注
  remark: String,
  // 日期
  date: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Bill', BillSchema)