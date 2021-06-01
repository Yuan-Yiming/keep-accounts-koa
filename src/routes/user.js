const avatar = require('gradient-avatar')
const Router = require('koa-router')

const User = require('../models/User') // User 模板
const { getHash } = require('../utils/hash')
const validator = require('validator')

const router = new Router()

/**
 * @route POST api/user/register
 * @desc 用户注册接口
 * @access 接口是公开的
 */
router.post('/register', async ctx => {
  let { name, email, password, password2 } = ctx.request.body
  name = name && name.trim()
  email = email && email.trim()
  password = password && password.trim()
  password2 = password2 && password2.trim()
  ctx.status = 500

  // 首先判断 email 是否已占用
  let result = await User.findOne({ email })
  if (result) {
    ctx.body = { msg: '邮箱已被占用' }
  } else if (!validator.isEmail(email)) {
    ctx.body = { msg: '邮箱不合法' }
  } else if (!validator.isLength(name, { min: 3, max: 10 })) {
    ctx.body = { msg: '名称字符长度必须为3-10' }
  } else if (validator.isEmpty(password)) {
    ctx.body = { msg: '密码不能为空' }
  } else if (!validator.equals(password, password2)) {
    ctx.body = { msg: '两次输入密码不一致' }
  } else {
    // 创建新用户
    const newUser = new User({
      name,
      email,
      password: getHash(password),
      avatar: avatar(email, 100)
    })

    // 保存用户
    await newUser
      .save()
      .then(user => {
        ctx.status = 200
        ctx.body = user // 返回用户信息
      })
      .catch(err => {
        ctx.body = { msg: '用户注册失败' }
        console.log(err)
      })
  }


})

module.exports = router.routes()