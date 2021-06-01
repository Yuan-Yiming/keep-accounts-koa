var bcrypt = require('bcryptjs')

// 获取 hash
let salt = bcrypt.genSaltSync(10)
let getHash = s => bcrypt.hashSync(s, salt)

module.exports = {
  getHash
}