const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')

const registerRoutes = require('./routes')
const { mongoUrl } = require('./config')

const app = new Koa()
const router = new Router()

// 配置bodyParser
app.use(new bodyParser())

// 配置路由
app.use(router.routes()).use(router.allowedMethods())

// 路由
router.get('/', async ctx => {
  ctx.body = { msg: 'hellow koa' }
})

// 注册路由
registerRoutes(router)

// 连接数据库
mongoose
  .connect(mongoUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log('mongodb connected ...');
  })
  .catch(err => {
    console.log(err);
  })

// 监听端口
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`server started on ${port} ...`)
})