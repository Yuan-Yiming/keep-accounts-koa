const user = require('./user')
const bill = require('./bill')


const routeDict = {
  '/api/user': user,
  '/api/bill': bill
}

// 注册路由
const registerRoutes = (router) => {
  Object.keys(routeDict).forEach(route => {
    router.use(route, routeDict[route])
  })
}

module.exports = registerRoutes