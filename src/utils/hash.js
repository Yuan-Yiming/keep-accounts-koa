var bcrypt = require('bcryptjs')

// 获取 hash 加密
const getHash = s => bcrypt.hashSync(s, bcrypt.genSaltSync(10))

// 检查 字符串 和 hash
const checkHash = (s, hash) => bcrypt.compareSync(s, hash)

module.exports = {
  getHash,
  checkHash
}