const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')
const checkToken = require('./utils/checkToken')

const registerRoutes = require('./routes')
const { mongoUrl } = require('./config')

const app = new Koa()
const router = new Router()

app.use(checkToken)

const swagger = require('../swagger')
const { koaSwagger } = require('koa2-swagger-ui')
// 接口文档配置
app.use(swagger.routes(), swagger.allowedMethods())
app.use(koaSwagger({
  routePrefix: '/swagger', // 接口访问地址
  swaggerOptions: {
    url: '/swagger.json' // example path to json 其实就是之后swagger-jsdoc生成的文档地址
  }
}))

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