const Router = require("koa-router");
const {
  profitability,
  growthAbility,
  operationAbility,
  riskResistanceAbility,
  cashFlowHealthAbility,
} = require("../controller/ability.controller");

const abilityRouter = new Router({
  prefix: "/api/ability",
});

abilityRouter.get("/profitability", profitability);
abilityRouter.get("/growth", growthAbility);
abilityRouter.get("/operation", operationAbility);
abilityRouter.get("/risk", riskResistanceAbility);
abilityRouter.get("/cashflow", cashFlowHealthAbility);

module.exports = abilityRouter;
