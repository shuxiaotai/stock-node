const Router = require("koa-router");
const {
  profitability,
} = require("../controller/ability.controller");

const abilityRouter = new Router({
  prefix: "/api/ability",
});

abilityRouter.get("/profitability", profitability);

module.exports = abilityRouter;
