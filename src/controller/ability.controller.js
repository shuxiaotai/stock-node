const { successRes } = require("../utils/response");
const service = require("../service/ability.service");

class AbilityController {
  async profitability(ctx, next) {
    const code = ctx.query.code;
    const result = await service.selectProfitabilityByCode(code);
    ctx.body = successRes(result);
  }
}

module.exports = new AbilityController();
