const { Router } = require("express");
const dashboardRouter = Router();
const dashboardController = require("../controllers/dashboardController");

dashboardRouter.get("/", dashboardController.getUserDashboard);

dashboardRouter.get("/account", dashboardController.getUserProfile);
dashboardRouter.get(
    "/account/update/name",
    dashboardController.getUserNameChange
);
dashboardRouter.get(
    "/account/update/password",
    dashboardController.getUserPasswordChange
);

dashboardRouter.post(
    "/account/update/name",
    dashboardController.changeUserName
);
dashboardRouter.post(
    "/account/update/password",
    dashboardController.changeUserPw
);

module.exports = dashboardRouter;
