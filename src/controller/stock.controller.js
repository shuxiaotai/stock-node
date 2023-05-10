const service = require("../service/stock.service");
const { successRes } = require("../utils/response");

const { getBoards, getGuideLine, getCashTrend } = require("../app/dip-stock");
const syncService = require("../service/sync.service");

class StockController {
  async search(ctx, next) {
    const nameOrCode = ctx.query.q;
    let result = [];
    if (nameOrCode) {
      result = await service.searchStock(nameOrCode);
    }
    ctx.body = successRes(result);
  }

  async detail(ctx, next) {
    const code = ctx.query.code;
    const year = new Date().getFullYear();
    const boards = await getBoards(code);
    // 整体概览数据
    const guideLine = await getGuideLine(code, year);
    const { debt_decapital_structure } = guideLine;
    const [targetStock] = await syncService.selectStockByCode(code);
    const trendResult = await getCashTrend(
      `${targetStock.region}${targetStock.code}`
    );
    ctx.body = successRes({
      industry: boards,
      marketValue: debt_decapital_structure[0]?.ASSET,
      pe: "",
      pb: "",
      trendResult,
      stock: {
        ...targetStock,
      },
    });
  }

  // 1. 盈利能力profitability:
  //   毛利率: gpr, 净利率: npr, 总资产回报率: roa, 净资产回报率(收益率): roe, 资本回报率: roic, 经营性资产回报率: rooa
  // 2. 成长能力growthAbility
  //   营收增长率: rgr, 净利润增长率: npgr, 经营性利润增长率: groop, 现金流量净额增长率: groop, 净资本增长率: ncgr
  // 3. 营运能力operationAbility
  //   存货周转天数: dsoi, 应收账款周转天数: dso, 应付账款周转天数: doapt, 总资产周转天数: tatd, 净运营周期天数: donoc，
  //   存货占流动资产比例: roitca, 应收占流动资产比例: rortca
  // 4. 抗风险能力riskResistanceAbility
  //   总资产负债率: talr, 净资产负债率: dtnwr, 有息负债率: ibdr, 软性资产率: rosa, 速动比率: qr
  // 5. 现金流健康度cashFlowHealth
  //   销售现金占营收比率: rocostr, 经营现金流净额占净利润比率: ronocftnp, 现金流净额速偿比率: ncfr, 自由现金流比率: fcfr,
  //   现金再投资比率: crr
  async abilityAnalysis(ctx, next) {
    const code = ctx.query.code;
    const {
      profitability,
      growth_ability,
      operation_ability,
      debt_decapital_structure,
      cash_flow,
    } = await getGuideLine(code, "2023");
    ctx.body = {
      profitability: {
        gpr: profitability[0]?.SGPR,
        npr: profitability[0]?.PMOS,
        roa: profitability[0]?.ROA,
        roe: profitability[0]?.ROE,
        roic: "暂无",
        rooa: "暂无",
      },
      growthAbility: {
        rgr: growth_ability[0]?.MBRG,
        npgr: growth_ability[0]?.NPGR,
        groop: "暂无",
        ncfgr: "暂无",
        ncgr: growth_ability[0]?.GRNA,
      },
      operationAbility: {
        dsoi: operation_ability[0]?.DSI,
        dso: operation_ability[0]?.DSO,
        doapt: "暂无",
        tatd: operation_ability[0]?.TATD,
        donoc: "暂无",
        roitca: "暂无",
        rortca: "暂无",
      },
      riskResistanceAbility: {
        talr: debt_decapital_structure[0]?.LEV,
        dtnwr: "暂无",
        ibdr: "暂无",
        rosa: "暂无",
        qr: debt_decapital_structure[0]?.QR,
      },
      cashFlowHealth: {
        rocostr: cash_flow[0]?.NOCFTSR,
        ronocftnp: cash_flow[0]?.NOCFTNP,
        ncfr: "暂无",
        fcfr: cash_flow[0]?.CFR,
        crr: "暂无",
      },
    };
  }
}

module.exports = new StockController();
