const avatar = require('gradient-avatar')
const Router = require('koa-router')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const { secret } = require('../config')
const User = require('../models/User') // User 模板
const { ctx200, ctx500 } = require('../utils/ctx')
const { getHash, checkHash } = require('../utils/hash')

const router = new Router()

// const userDoc = require('./doc/user')

/**
 * @route POST api/user/register
 * @desc 用户注册
 */
router.post('/register', async ctx => {
  let { name, email, password, password2 } = ctx.request.body
  name = name && name.trim() || ''
  email = email && email.trim() || ''
  password = password && password.trim() || ''
  password2 = password2 && password2.trim() || ''

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

/**
 * @route POST api/user/login 
 * @desc 用户登录
 */
router.post('/login', async ctx => {
  let { email, password } = ctx.request.body

  // 查询用户
  let user = await User.findOne({ email })

  if (user) {
    // 检查密码是否正确
    if (checkHash(password, user.password)) {
      let { id, name, email, avatar } = user

      // 生成 token
      const token = jwt.sign({ id, time: new Date().getTime(), timeout: 1000 * 60 * 60 }, secret)

      ctx.body = { token, id, name, email, avatar }
    } else {
      ctx500(ctx, '密码不正确')
    }
  } else {
    ctx500(ctx, '用户不存在')
  }

})

/**
 * @route DELETE api/user/delete 
 * @desc 用户注销、删除
 */
router.delete('/delete', async ctx => {
  // 先查找用户
  let { id } = ctx.request.query
  try {
    let user = await User.findById(id)
    if (user) {
      await User.deleteOne({ _id: id })
      ctx200(ctx, '用户注销成功')
    } else {
      ctx500(ctx, '用户不存在')
    }
  } catch (error) {
    // id 长度不等于24时会报错
    ctx500(ctx, '用户不存在')
    // console.error(error)
  }
})

module.exports = router.routes()