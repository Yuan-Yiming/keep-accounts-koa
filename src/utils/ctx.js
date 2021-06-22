// 500 报错信息
const ctx500 = (ctx, msg) => {
  ctx.status = 500
  ctx.body = { msg }
}

// 200 成功信息
const ctx200 = (ctx, msg) => {
  ctx.status = 200
  ctx.body = { msg }
}

module.exports = {
  ctx200,
  ctx500
}