const Koa = require("koa");
const bodyParser = require('koa-bodyparser')

const stockRouter = require('../router/stock.router')
const syncRouter = require('../router/sync.router')

const app = new Koa();

app.use(bodyParser())
app.use(syncRouter.routes())
app.use(syncRouter.allowedMethods())
app.use(stockRouter.routes())
app.use(stockRouter.allowedMethods())

module.exports = app;
