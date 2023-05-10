const conn = require("../app/database");

class SyncService {
  async selectStockByCode(code) {
    const statement = "SELECT * FROM stock WHERE `code` = ?";
    const [result] = await conn.execute(statement, [code]);
    return result;
  }

  async insertStock(stockItem) {
    const statement =
      "INSERT INTO `stock` (name, code, region) VALUES (?, ?, ?)";
    const [result] = await conn.execute(statement, [
      stockItem.name,
      stockItem.code,
      stockItem.region,
    ]);
    return result;
  }

  async selectAllStock() {
    const statement = "SELECT * FROM stock";
    const [result] = await conn.execute(statement);
    return result;
  }

  // 5张能力表通过code查询统一入口
  async selectAbilityByCodeAndPeriod(tableName, item) {
    const statement = `SELECT * FROM ${tableName} WHERE code = ? AND period = ?`;
    const [result] = await conn.execute(statement, [item.code, item.Date]);
    return result.length;
  }

  async insertProfitability(item) {
    const statement =
      "INSERT INTO `profitability` (stock_id, code, npr, roa, roe, period) VALUES(?, ?, ?, ?, ?, ?)";
    const [result] = await conn.execute(statement, [
      item.id,
      item.code,
      item.PMOS,
      item.ROA,
      item.ROE,
      item.Date,
    ]);
    return result;
  }

  async insertGrowthAbility(item) {
    const statement =
      "INSERT INTO `growth_ability` (stock_id, code, rgr, npgr, ncgr, period) VALUES(?, ?, ?, ?, ?, ?)";
    const [result] = await conn.execute(statement, [
      item.id,
      item.code,
      item.MBRG,
      item.NPGR,
      item.GRNA,
      item.Date,
    ]);
    return result;
  }

  async insertOperationAbility(item) {
    const statement =
      "INSERT INTO `operation_ability` (stock_id, code, dsoi, dso, tatd, period) VALUES(?, ?, ?, ?, ?, ?)";
    const [result] = await conn.execute(statement, [
      item.id,
      item.code,
      item.DSI,
      item.DSO,
      item.TATD,
      item.Date,
    ]);
    return result;
  }

  async insertRiskResistanceAbility(item) {
    const statement =
      "INSERT INTO `risk_resistance_ability` (stock_id, code, talr, qr, period) VALUES(?, ?, ?, ?, ?)";
    const [result] = await conn.execute(statement, [
      item.id,
      item.code,
      item.LEV,
      item.QR,
      item.Date,
    ]);
    return result;
  }

  async insertCashFlowHealth(item) {
    const statement =
      "INSERT INTO `cash_flow_health` (stock_id, code, rocostr, ronocftnp, fcfr, period) VALUES(?, ?, ?, ?, ?, ?)";
    const [result] = await conn.execute(statement, [
      item.id,
      item.code,
      item.NOCFTSR,
      item.NOCFTNP,
      item.CFR,
      item.Date,
    ]);
    return result;
  }

  async selectTrendDataByCodeAndOpenDate(item) {
    const statement = `SELECT * FROM trend WHERE code = ? AND opendate = ?`;
    const [result] = await conn.execute(statement, [item.code, item.opendate]);
    return result;
  }

  async insertTrendData(item) {
    const statement =
      "INSERT INTO `trend` (stock_id, code, opendate, trade, changeratio, turnover, netamount, ratioamount, r0_net, r0_ratio, r0x_ratio, cnt_r0x_ratio, cate_ra, cate_na) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const [result] = await conn.execute(statement, [...Object.values(item)]);
    return result;
  }
}

module.exports = new SyncService();
