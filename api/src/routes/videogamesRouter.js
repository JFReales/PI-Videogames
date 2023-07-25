const { Router } = require("express");

const {
	getVideogamesHandler,
	getVideogameIdHandler,
	postVideogamesHandler,
} = require("../handlers/videogamesHandler");

const videogamesRouter = Router();

videogamesRouter.get("/", getVideogamesHandler);

videogamesRouter.get("/:id", getVideogameIdHandler);

videogamesRouter.post("/", postVideogamesHandler);

module.exports = videogamesRouter;
