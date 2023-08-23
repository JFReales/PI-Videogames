const { getVideogameQuery } = require("./getVideogamesQuery");
const { Videogame, Genre } = require("../db");

///// en este componente se crea el videogame con la informacion enviada por el form
//// Se declara una función asíncrona llamada createVideogame
const createVideogame = async (
	name,
	description,
	platforms,
	rating,
	background_image,
	released,
	genres
) => {
	/// Se utiliza la función findOne del modelo Videogame donde con el atributo name valor name,
	//// para descartar la creacion de juegos con el mismo nombre
	let apiRepeated = await getVideogameQuery(name);
	let nombre = apiRepeated.find(
		(game) => game.name.toLowerCase() === name.toLowerCase()
	);
	const regexUrlImg =
		/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/i;
	const regexImg = /(http[s]?:\/\/.*\.(?:png|jpg|gif|svg|jpeg))/i;

	if (nombre) {
		return {
			error: "El juego ya existe",
		};
	}

	if (!background_image) {
		return {
			error: "Imagen vacía",
		};
	}

	// el condicional checkea si hay resultado que se envie un error.
	// el segundo condicional hace que si no hay resultado se cree el juego en la base de datos
	else {
		///Se utiliza la función create del modelo Videogame para crear un nuevo juego
		const newVideogame = await Videogame.create({
			name,
			description,
			platforms,
			rating,
			background_image,
			released,
		});
		/// Se utiliza la función findAll del modelo Genre para buscar en la base de datos
		/// los géneros que coincidan con los proporcionados en el parámetro genres.
		let genreBd = await Genre.findAll({
			where: { name: genres },
		});
		/// Se utiliza el método addGenres del objeto newVideogame para asociar los géneros encontrados
		///   (genreBd) con el juego recién creado.
		newVideogame.addGenres(genreBd);
		return { newVideogame, message: "Juego creado satisfactoriamente" };
	}
};

module.exports = {
	createVideogame,
};
