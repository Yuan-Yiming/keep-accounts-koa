/**
 * 评论表
 */

const { Schema, model } = require('mongoose')

const CommentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' }, // 用户id
  talkId: { type: Schema.Types.ObjectId, ref: 'Talk' }, // 消息id
  parentId: { type: Schema.Types.ObjectId, ref: 'Comment' }, // 上级评论id
  content: { type: String, require: true }, // 评论内容
  like: { type: Number, default: 0 }, // 点赞数
  date: { type: Date, default: Date.now } // 日期
})

module.exports = model('Comment', CommentSchema)
