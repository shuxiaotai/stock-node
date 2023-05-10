const conn = require("../app/database");

class StockService {
  async searchStock(nameOrCode) {
    // 使用REPLACE函数将字段值去除空格，如字段值是万 科A，搜索值是万科的情况
    const statement =
      "SELECT * FROM stock WHERE REPLACE(name,' ','') LIKE ? OR `code` LIKE ?"
    const [result] = await conn.execute(statement, [
      `%${nameOrCode}%`,
      `${nameOrCode}%`,
    ]);
    return result;
  }
}

module.exports = new StockService();
