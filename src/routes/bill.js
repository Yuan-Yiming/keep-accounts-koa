const Router = require('koa-router')
const Bill = require('../routes/Bill')
const { ctx200, ctx500 } = require('../utils/ctx')

const router = new Router()

// 新增账单记录
router.post('/bill-item', async ctx => {
  ctx.boty = { msg: '666' }
})

// 删除账单记录
router.delete('/bill-item', async ctx => { })

// 修改账单记录
router.put('/bill-item', async ctx => { })

// 查询账单记录
router.get('/bill-item', async ctx => { })

// 查询账单列表
router.get('/bill-list', async ctx => { })

module.exports = router.routes()
