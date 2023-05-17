const Router = require("koa-router");
const {
  historyValue,
  historyPeAndPb,
  historyPs,
  historyMarketValue
} = require("../controller/history.controller");

const historyRouter = new Router({
  prefix: "/api/history",
});

historyRouter.get("/value", historyValue);
historyRouter.get("/pepb", historyPeAndPb);
historyRouter.get("/ps", historyPs);
historyRouter.get("/market/value", historyMarketValue);

module.exports = historyRouter;
