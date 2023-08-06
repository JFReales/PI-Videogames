const { Router } = require("express");

const {
	getVideogamesHandler,
	getVideogameIdHandler,
	postVideogamesHandler,
} = require("../handlers/videogamesHandler");

const videogamesRouter = Router();

const validate = (req, res, next) => {
	const { name, platforms } = req.body;
	if (!name) return res.status(400).json({ error: "Missing name" });
	if (!platforms) return res.status(400).json({ error: "Missing platforms" });

	next();
};

videogamesRouter.get("/", getVideogamesHandler);

videogamesRouter.get("/:id", getVideogameIdHandler);

videogamesRouter.post("/", validate, postVideogamesHandler);

module.exports = videogamesRouter;
