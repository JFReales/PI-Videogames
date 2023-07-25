/// Se importa el módulo axios para realizar solicitudes HTTP.
const axios = require("axios");
/// Se importa el módulo dotenv y apy_key para cargar variables de entorno desde un archivo
require("dotenv").config();
const { API_KEY } = process.env;
//Se importan los modelos
const { Videogame, Genre } = require("../db");
///Se declara una función asíncrona
const getGenres = async () => {
	///se utiliza la funcion axios.get para realizar una solicitud
	const response = await axios.get(
		`https://api.rawg.io/api/genres?key=${API_KEY}`
	);
	/// Se utiliza el método map en response.data.results para mapear y extraer los nombres de los géneros.
	const apiGenres = response.data.results.map((g) => g.name);
	/// Se utiliza el método forEach en apiGenres para iterar sobre cada nombre de género.
	///Dentro del bucle, se utiliza el método Genre.findOrCreate
	/// para buscar en la base de datos un género con el mismo nombre y, si no existe, crearlo.
	apiGenres.forEach((e) =>
		Genre.findOrCreate({
			where: {
				name: e,
			},
		})
	);
	////Se utiliza el método Genre.findAll para obtener todos los registros de géneros en la base de datos.
	/// Los géneros encontrados se asignan a la constante allGenres
	const allGenres = await Genre.findAll();

	return allGenres;
};

module.exports = { getGenres };
