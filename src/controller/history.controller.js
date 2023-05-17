const { successRes } = require("../utils/response");
const {
  getPeHistory,
  getPbHistory,
  getPsHistory,
  getMarketValueHistory,
  getValueHistory
} = require("../utils/history-helper");
const syncService = require("../service/sync.service");

class HistoryController {
  async historyValue(ctx, next) {
    const code = ctx.query.code;
    const [selectStock] = await syncService.selectStockByCode(code);
    const result = await getValueHistory(selectStock.region, selectStock.code);
    ctx.body = successRes({
      ...result.data
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
