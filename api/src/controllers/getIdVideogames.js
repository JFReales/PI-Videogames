const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db");

//// Se declara una función asíncrona llamada getIdVideogame que reciben dos parámetros: id y origen.
const getIdVideogame = async (id, origen) => {
	/// Se verifica si el valor de origen es igual a 'api'
	if (origen === "api") {
		/// Si es así, se realiza una solicitud GET a la API utilizando axios qye incluye id y la api key
		let resp = await axios.get(
			`https://api.rawg.io/api/games/${id}?key=${API_KEY}`
		);
		///Se crea un objeto videogame que contiene propiedades con la información relevante
		//// del videojuego obtenida de resp.data.
		let videogame = {
			id: resp.data.id,
			name: resp.data.name,
			description: resp.data.description_raw,
			background_image: resp.data.background_image,
			released: resp.data.released,
			rating: resp.data.rating,
			//// Los valores de genres se obtienen mediante el uso de métodos de arreglo
			///  (map) para mapear y extraer la información específica.
			platforms: resp.data.platforms.map((p) => p.platform.name),
			genres: resp.data.genres.map((e) => e.name),
		};
		/// se devuelve el objeto videogame
		return videogame;
	} else {
		let encontrado = await Videogame.findByPk(id, {
			include: [
				{
					model: Genre,
					attributes: ["name"],
					through: {
						attributes: [],
					},
				},
			],
		});
		// se devuelve el videogame encontrado
		return encontrado;
	}
};
module.exports = {
	getIdVideogame,
};
