const axios = require("axios");

const getPeHistory = async (region, code) => {
  const result = await axios.get(
    `https://eniu.com/chart/pea/${region}${code}/t/all`
  );
  return result;
};

const getPbHistory = async (region, code) => {
  const result = await axios.get(
    `https://eniu.com/chart/pba/${region}${code}/t/all`
  );
  return result;
};

const getPsHistory = async (region, code) => {
  const result = await axios.get(
    `https://eniu.com/chart/psa/${region}${code}/t/all`
  );
  return result;
};

const getMarketValueHistory = async (region, code) => {
  const result = await axios.get(
    `https://eniu.com/chart/marketvaluea/${region}${code}`
  );
  return result;
};

module.exports = {
  getPeHistory,
  getPbHistory,
  getPsHistory,
  getMarketValueHistory,
};
