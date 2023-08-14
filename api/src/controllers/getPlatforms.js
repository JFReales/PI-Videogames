const axios = require("axios");
require("dotenv").config();

const { API_KEY } = process.env;

/// se declara la funcion asincrona getPlatforms
const getPlatforms = async () => {
	// se guarda en una constante la respuesta de la peticion por axios al endpoint de platforms
	const response = await axios.get(
		`https://api.rawg.io/api/platforms?key=${API_KEY}`
	);
	/// Se utiliza el método map en response.data.results para mapear y extraer los nombres de las plataformas.
	/// asignandolo a la constante plataformasApi
	const plataformsApi = response.data.results.map((el) => el.name);

	return plataformsApi;
};

module.exports = { getPlatforms };
