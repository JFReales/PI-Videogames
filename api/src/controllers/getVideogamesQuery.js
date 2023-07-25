const axios = require("axios");
require("dotenv").config();
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
const { Op } = require("sequelize");

const getVideogameQuery = async (name) => {
	let videogamesApi = [];

	const response = await axios.get(
		`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
	);

	if (response.data && response.data.results[0]) {
		for (let i = 0; i < 15; i++) {
			if (response.data.results[i]) {
				const {
					id,
					name,
					background_image,
					genres,
					rating,
					released,
					platforms,
				} = response.data.results[i];

				const generos = genres && genres.map((g) => g.name);
				const plataformas = platforms && platforms.map((p) => p.platform.name);

				videogamesApi.push({
					id,
					name,
					background_image,
					genres: generos,
					platforms: plataformas,
					rating,
					released,
				});
			}
		}
	}
	const responseBd = await Videogame.findAll({
		where: {
			name: { [Op.iLike]: `%${name}%` },
		},
		include: {
			model: Genre,
			attributes: ["name"],
			through: {
				attributes: [],
			},
		},
	});

	const formattedVg = responseBd.map((videog) => ({
		...videog.toJSON(),
		genres: videog.genres.map((g) => g.name).join(", "),
	}));

	const total = [...videogamesApi, ...formattedVg];
	return total;
};

module.exports = { getVideogameQuery };
