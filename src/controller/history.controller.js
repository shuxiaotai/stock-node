const { successRes } = require("../utils/response");
const {
  getPeHistory,
  getPbHistory,
  getPsHistory,
  getMarketValueHistory
} = require("../utils/history-helper");
const service = require("../service/history.service");
const syncService = require("../service/sync.service");

class HistoryController {
  async trendValue(ctx, next) {
    const code = ctx.query.code;
    const result = await service.selectTrendValueByCode(code);
    const date = []
    const trade = []
    result.forEach((item) => {
      date.push(item.opendate)
      trade.push(item.trade)
    })
    ctx.body = successRes({
      date,
      trade
    });
  }
  async historyPeAndPb(ctx, next) {
    const code = ctx.query.code;
    const [selectStock] = await syncService.selectStockByCode(code);
    const peResult = await getPeHistory(selectStock.region, selectStock.code);
    const pbResult = await getPbHistory(selectStock.region, selectStock.code);
    // const psResult = await getPsHistory(selectStock.region, selectStock.code);
    ctx.body = successRes({
      // peResult: peResult.data,
      // pbResult: pbResult.data,
      // psResult: psResult.data,
      date: peResult.data.date,
      pe: peResult.data['pe_ttm'],
      pb: pbResult.data.pb,
    });
  }

  async historyPs(ctx, next) {
    const code = ctx.query.code;
    const [selectStock] = await syncService.selectStockByCode(code);
    const psResult = await getPsHistory(selectStock.region, selectStock.code);
    ctx.body = successRes({
      date: psResult.data.date,
      ps: psResult.data.ps,
    });
  }

  async historyMarketValue(ctx, next) {
    const code = ctx.query.code;
    const [selectStock] = await syncService.selectStockByCode(code);
    const result = await getMarketValueHistory(selectStock.region, selectStock.code);
    ctx.body = successRes({
      ...result.data
    });
  }

}

module.exports = new HistoryController();
