const jwt = require('jsonwebtoken')
const { secret } = require('../config')
const User = require('../models/User') // User 模板

const checkToken = async (ctx, next) => {
  let { url, headers } = ctx.request

  // 注册或登录接口无需验证 token
  if (['/api/user/register', '/api/user/login'].includes(url)) {
    await next()
  } else {
    // 规定 token 写在 header 的 authorization 上
    let token = headers.authorization.split(' ')[1]
    // console.log('token', token)
    
    try {
      // 解码
      let { id, time, timeout } = jwt.verify(token, secret)

      // 判断真实用户真实性
      const user = await User.findById(id)

      if (!user) {
        ctx.status = 401
        ctx.body = { msg: '用户没有权限' }
      } else if (new Date().getTime() > (time + timeout)) {
        // 判断 token 有没有过期
        ctx.status = 401
        ctx.body = { msg: '用户已过期，请重新登录' }
      } else {
        await next()
      }
    } catch (error) {
      ctx.status = 401
      ctx.body = { msg: '用户没有权限' }
    }

  }
}

module.exports = checkToken