const user = require('./user')


const routeDict = {
  '/api/user': user
}

// 注册路由
const registerRoutes = (router) => {
  Object.keys(routeDict).forEach(route => {
    router.use(route, routeDict[route])
  })
}

module.exports = registerRoutes