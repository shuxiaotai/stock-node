const conn = require("../app/database");

class AbilityService {
  // 净利率、总资产回报率、净资产回报率
  async selectProfitabilityByCode(code) {
    const statement =
      "SELECT npr, roa, roe, period FROM profitability WHERE code = ? ORDER BY period"
    const [result] = await conn.execute(statement, [code]);
    return result;
  }

  // 营收增长率、净利润增长率、净资本增长率
  async selectGrowthAbilityByCode(code) {
    const statement =
      "SELECT rgr, npgr, ncgr, period FROM growth_ability WHERE code = ? ORDER BY period"
    const [result] = await conn.execute(statement, [code]);
    return result;
  }

  // 存货周转天数、应收账款周转天数、总资产周转天数
  async selectOperationAbilityByCode(code) {
    const statement =
      "SELECT dsoi, dso, tatd, period FROM operation_ability WHERE code = ? ORDER BY period"
    const [result] = await conn.execute(statement, [code]);
    return result;
  }

  // 总资产负债率、速动比率
  async selectRiskResistanceAbilityByCode(code) {
    const statement =
      "SELECT talr, qr, period FROM risk_resistance_ability WHERE code = ? ORDER BY period"
    const [result] = await conn.execute(statement, [code]);
    return result;
  }

  // 销售现金占营收比率、经营性现金流净额占净利润比率、自由现金流比率
  async selectCashFlowHealthAbilityByCode(code) {
    const statement =
      "SELECT rocostr, ronocftnp, fcfr, period FROM cash_flow_health WHERE code = ? ORDER BY period"
    const [result] = await conn.execute(statement, [code]);
    return result;
  }
}

module.exports = new AbilityService();
