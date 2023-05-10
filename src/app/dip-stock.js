const dip = require("dipiper");

// 所有股票列表
const getStockList = dip.stock.symbols.getStockList;

// 个股所属板块
const getBoards = dip.stock.symbols.getBoards

// 个股主要指标
const getGuideLine = dip.stock.finance.getGuideLine

// 个股资金流向
const getCashTrend = dip.stock.fundflow.getStockTrendHis

module.exports = {
  getStockList,
  getBoards,
  getGuideLine,
  getCashTrend
}
