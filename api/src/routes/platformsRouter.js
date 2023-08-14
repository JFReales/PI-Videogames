const { Router } = require("express");
const platformsRouter = Router();
const { platformsHandler } = require("../handlers/platformsHandler");

platformsRouter.get("/", platformsHandler);

module.exports = platformsRouter;
