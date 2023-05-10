const Router = require("koa-router");
const {
  search,
  detail,
  abilityAnalysis,
} = require("../controller/stock.controller");

const stockRouter = new Router({
  prefix: "/api/stock",
});

stockRouter.get("/search", search);
stockRouter.get("/detail", detail);
stockRouter.get("/ability", abilityAnalysis);

module.exports = stockRouter;
