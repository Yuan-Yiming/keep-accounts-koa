/**
 * 计划（存钱）
 */

const { Schema, model } = require('mongoose')

const TodoSchema = new Schema({
  content: { type: String }
})

module.exports = TodoSchema