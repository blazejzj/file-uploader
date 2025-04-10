const { Router } = require("express");
const dashboardRouter = Router();
const dashboardController = require("../controllers/dashboardController");

dashboardRouter.get("/", dashboardController.getUserDashboard);

module.exports = dashboardRouter;
