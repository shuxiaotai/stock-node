const { getGuideLine } = require("../app/dip-stock");
const {
  selectAbilityByCodeAndPeriod,
  insertProfitability,
  insertGrowthAbility,
  insertOperationAbility,
  insertRiskResistanceAbility,
  insertCashFlowHealth,
} = require("../service/sync.service");

const tableNameMap = {
  profitability: {
    tableName: "profitability",
    originKey: "profitability",
  },
  growthAbility: {
    tableName: "growth_ability",
    originKey: "growth_ability",
  },
  operationAbility: {
    tableName: "operation_ability",
    originKey: "operation_ability",
  },
  riskResistanceAbility: {
    tableName: "risk_resistance_ability",
    originKey: "debt_decapital_structure",
  },
  cashFlowHealth: {
    tableName: "cash_flow_health",
    originKey: "cash_flow",
  },
};

function* genereteGuideLine(stockList, years) {
  for (let year of years) {
    for (const item of stockList) {
      console.log("--------ability请求-------", item, year);
      yield {
        code: item.code,
        id: item.id,
        data: getGuideLine(item.code, year),
      };
    }
  }
}

const insertHelper = async (insertData) => {
  const { id, code, key, data } = insertData;
  const insertName = `insert${key.replace(key[0], key[0].toUpperCase())}`;
  data.forEach((item) => {
    if (JSON.stringify(item) !== "{}") {
      let operItem = {
        id,
        code,
        ...item,
      };
      selectAbilityByCodeAndPeriod(tableNameMap[key].tableName, operItem).then(
        (selectResult) => {
          if (!selectResult) {
            eval(`${insertName}(operItem)`);
          }
        }
      );
    }
  });
};

const fetchGuideLine = (stockList) => {
  return new Promise((resolve) => {
    let result = [];
    let years = ["2022", "2023"];
    const it = genereteGuideLine(stockList, years);
    const co = () => {
      let cur = it.next();
      if (!cur.done) {
        cur.value.data.then((val) => {
          let insertData = {
            id: cur.value.id,
            code: cur.value.code,
          };
          Object.keys(tableNameMap).forEach((key) => {
            const cur = tableNameMap[`${key}`].originKey;
            insertHelper({
              ...insertData,
              key,
              data: val[`${cur}`],
            });
          });
          result.push({
            ...insertData,
            data: val,
          });
          co();
        });
      }
      if (cur.done) {
        resolve(result);
      }
    };
    co();
  });
};

module.exports = {
  fetchGuideLine,
};
