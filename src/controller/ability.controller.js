const { successRes } = require("../utils/response");
const service = require("../service/ability.service");

class AbilityController {
  async profitability(ctx, next) {
    const code = ctx.query.code;
    const result = await service.selectProfitabilityByCode(code);
    ctx.body = successRes(result);
  }
    
  async growthAbility(ctx, next) {
    const code = ctx.query.code;
    const result = await service.selectGrowthAbilityByCode(code);
    ctx.body = successRes(result);
  }

  async operationAbility(ctx, next) {
    const code = ctx.query.code;
    const result = await service.selectOperationAbilityByCode(code);
    ctx.body = successRes(result);
  }

  async riskResistanceAbility(ctx, next) {
    const code = ctx.query.code;
    const result = await service.selectRiskResistanceAbilityByCode(code);
    ctx.body = successRes(result);
  }

  async cashFlowHealthAbility(ctx, next) {
    const code = ctx.query.code;
    const result = await service.selectCashFlowHealthAbilityByCode(code);
    ctx.body = successRes(result);
  }
}

module.exports = new AbilityController();
