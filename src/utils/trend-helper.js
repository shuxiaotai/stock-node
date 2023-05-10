const { getCashTrend } = require("../app/dip-stock");
const {
  selectTrendDataByCodeAndOpenDate,
  insertTrendData,
} = require("../service/sync.service");

function* genereteTrend(stockList) {
  for (const item of stockList) {
    console.log("--------trend请求-------", item);
    yield {
      code: item.code,
      id: item.id,
      data: getCashTrend(`${item.region}${item.code}`),
    };
  }
}

const insertHelper = (insertData) => {
  const { id, code } = insertData;
  const { valArr } = insertData;
  valArr.forEach((item) => {
    selectTrendDataByCodeAndOpenDate({
      code,
      opendate: item.opendate,
    }).then((selectResult) => {
      if (!selectResult.length) {
        insertTrendData({
          id,
          code,
          ...item,
        });
      }
    });
  });
};

const fetchTrend = (stockList) => {
  return new Promise((resolve) => {
    const result = [];
    const it = genereteTrend(stockList);
    const co = () => {
      let cur = it.next();
      if (!cur.done) {
        cur.value.data.then((val) => {
          let insertData = {
            id: cur.value.id,
            code: cur.value.code,
            valArr: val.date,
          };
          result.push(insertData);
          insertHelper(insertData);
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
  fetchTrend,
};
