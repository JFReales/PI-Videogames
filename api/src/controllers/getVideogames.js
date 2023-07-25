const axios = require("axios");
require("dotenv").config();
const { Videogame, Genre } = require("../db");
const db = require("../db");
const { API_KEY } = process.env;

////   se hace la consulta a la api iterandola 5 veces para lograr
///    los 100 videojuegos
const getGames = async () => {
	const arrayVideogames = [];
	let nextPage = `https://api.rawg.io/api/games?key=${API_KEY}`;

	for (let i = 0; i < 5; i++) {
		const response = await axios.get(nextPage);
		response.data.results.map((e) => {
			arrayVideogames.push({
				id: e.id,
				name: e.name,
				background_image: e.background_image,
				genres: e.genres.map((e) => e.name).join(", "),
				released: e.released,
				rating: e.rating,
				platform: e.platforms.map((e) => e.platform.name).join(", "),
			});
		});
		nextPage = response.data.next;
	}
	return arrayVideogames;
};
/// se hace consulta a la base de datos
const getInfoBd = async () => {
	const dbInfo = await Videogame.findAll({
		include: {
			model: Genre,
			attribute: ["name"],
			through: {
				attributes: [],
			},
		},
	});

	const dbVideogames = dbInfo.map((videogame) => ({
		...videogame.toJSON(),

		genres: videogame.genres.map((genre) => genre.name).join(", "),
	}));

	return dbVideogames;
};
/// junto las dos informaciones y las devuelvo

const getAllVideogamesInfo = async () => {
	const apiInfo = await getGames();
	const dbVideogames = await getInfoBd();
	const allInfo = apiInfo.concat(dbVideogames);

	return allInfo;
};

module.exports = { getAllVideogamesInfo, getGames };
