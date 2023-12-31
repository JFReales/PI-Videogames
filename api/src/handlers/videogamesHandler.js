const { getAllVideogamesInfo } = require("../controllers/getVideogames");
const { getIdVideogame } = require("../controllers/getIdVideogames");
const { createVideogame } = require("../controllers/postVideogames");
const { getVideogameQuery } = require("../controllers/getVideogamesQuery");

const getVideogamesHandler = async (req, res) => {
	const { name } = req.query;

	if (name) {
		try {
			// si se recibe nombre ///

			const response = await getVideogameQuery(name);
			res.status(200).json(response);
		} catch (error) {
			res.status(404).json({ error: error.message });
		}
	} else {
		try {
			const response = await getAllVideogamesInfo();
			res.status(200).json(response);
		} catch (error) {
			res.status(404).json({ error: error.message });
		}
	}
};

const getVideogameIdHandler = async (req, res) => {
	// const { id } = req.params;
	// res.send(`va a enviar el detalle del usuario de id ${id}`);
	const id = req.params.id;
	const origen = isNaN(id) ? "bd" : "api";

	try {
		const result = await getIdVideogame(id, origen);

		if (result) {
			res.status(200).json(result);
		}
	} catch (error) {
		res.status(501).send({ error: error.message });
	}
};

const postVideogamesHandler = async (req, res) => {
	try {
		const {
			name,
			description,
			platforms,
			rating,
			background_image,
			released,
			genres,
		} = req.body;

		const response = await createVideogame(
			name,
			description,
			platforms,
			rating,
			background_image,
			released,
			genres
		);

		if (response.error) {
			return res.status(400).send(response.error);
		}
		return res.status(201).send(response);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	getVideogameIdHandler,
	getVideogamesHandler,
	postVideogamesHandler,
};
