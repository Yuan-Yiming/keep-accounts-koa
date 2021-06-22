/**
 * 社区发布的消息
 * */
const { Schema, model } = require('mongoose')

const TalkSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' }, // 用户id
  content: { type: String, require: true }, // 内容
  like: { type: Number, default: 0 }, // 点赞数
  date: { type: Date, default: Date.now } // 日期
})

module.exports = model('Talk', TalkSchema)

