const Koa = require("koa");
const bodyParser = require('koa-bodyparser')

const stockRouter = require('../router/stock.router')
const syncRouter = require('../router/sync.router')
const abilityRouter = require('../router/ability.router')
const historyRouter = require('../router/history.router')

const app = new Koa();

app.use(bodyParser())
app.use(syncRouter.routes())
app.use(syncRouter.allowedMethods())
app.use(stockRouter.routes())
app.use(stockRouter.allowedMethods())
app.use(abilityRouter.routes())
app.use(abilityRouter.allowedMethods())
app.use(historyRouter.routes())
app.use(historyRouter.allowedMethods())


module.exports = app;
