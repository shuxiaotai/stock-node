const conn = require("../app/database");

class AbilityService {
  async selectProfitabilityByCode(code) {
    const statement =
      "SELECT npr, roa, roe, period FROM profitability WHERE code = ? ORDER BY period"
    const [result] = await conn.execute(statement, [code]);
    return result;
  }
}

module.exports = new AbilityService();
