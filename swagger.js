const Router = require('koa-router') //引入路由函数
const swaggerJSDoc = require('swagger-jsdoc')
const path = require('path')

const router = new Router()

const options = {
  swaggerDefinition: {
    info: {
      title: '斑马记账 - API接口文档',
      version: '1.0.0',
      description: 'API',
    },
    host: 'localhost:5000',
    basePath: '/' // Base path (optional)
  },
  apis: [path.join(__dirname, './src/routes/doc/*.js')], // 写有注解的router的存放地址, 最好path.join()
};

const swaggerSpec = swaggerJSDoc(options)

// 通过路由获取生成的注解文件
router.get('/swagger.json', async function (ctx) {
  ctx.set('Content-Type', 'application/json');
  ctx.body = swaggerSpec;
})

module.exports = router