const { getCashTrend } = require("./dipiper-helper");
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
  return new Promise((resolve) => {
    valArr.forEach((item) => {
      selectTrendDataByCodeAndOpenDate({
        code,
        opendate: item.opendate,
      }).then((selectResult) => {
        // 如果没找到就插入
        if (!selectResult.length) {
          resolve(
            insertTrendData({
              id,
              code,
              ...item,
            })
          );
        }else {
          // 否则继续下一个
          resolve(true)
        }
      });
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
          insertHelper(insertData).then(val => {
            // 插入完成后再请求下一个
            co();
          });
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
