const conn = require("../app/database");

class HistoryService {
  async selectTrendValueByCode(code) {
    const statement = "SELECT code, opendate, trade FROM trend WHERE `code` = ?";
    const [result] = await conn.execute(statement, [code]);
    return result;
  }

}

module.exports = new HistoryService();
