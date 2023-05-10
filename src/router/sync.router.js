const Router = require("koa-router");
const { syncStock, syncAbility, syncTrend } = require('../controller/sync.controller')

const syncRouter = new Router({
  prefix: "/api/sync",
});

syncRouter.get("/stock", syncStock);
syncRouter.get("/ability", syncAbility);
syncRouter.get("/trend", syncTrend);

module.exports = syncRouter

