const { getStockList, getGuideLine } = require("../app/dip-stock");
const { successRes } = require("../utils/response");
const { fetchGuideLine } = require("../utils/ability-helper");
const { fetchTrend } = require("../utils/trend-helper");
const service = require("../service/sync.service");

class SyncController {
  async syncStock(ctx, next) {
    const stockList = [];
    const result = await getStockList();
    result.forEach((item) => {
      stockList.push({
        code: item.code,
        name: item.name,
        region: item.symbol.slice(0, 2),
      });
    });
    for (let stockItem of stockList) {
      const result = await service.selectStockByCode(stockItem.code);
      if (!result.length) {
        const insertResult = await service.insertStock(stockItem);
      }
    }
    ctx.body = successRes(
      `股票同步完成${result.length}条${new Date().toString()}`
    );
  }

  async syncAbility(ctx, next) {
    const allStock = await service.selectAllStock();
    const result = await fetchGuideLine(allStock);
    ctx.body = successRes({
      info: `主要信息同步完成 ${result.length} 条${new Date().toString()}`,
      result,
    });
  }

  async syncTrend(ctx, next) {
    const allStock = await service.selectAllStock();
    const result = await fetchTrend(allStock);
    ctx.body = successRes({
      info: `价格同步完成 ${result.length} 条${new Date().toString()}`,
      result,
    });
  }
}

module.exports = new SyncController();
