/* eslint-disable no-useless-escape */
export default function validation({
	name,

	checkboxPlatforms,
	background_image,
	checkboxGenres,
}) {
	let error = {};
	let isGenres = Object.values(checkboxGenres);
	let isPlatforms = Object.values(checkboxPlatforms);

	const regexUrlImg =
		/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/i;
	const regexImg = /(http[s]?:\/\/.*\.(?:png|jpg|gif|svg|jpeg))/i;

	if (!name) {
		error.name = "El nombre no puede estar vacío";
	}
	if (name.length > 40) {
		error.name = "El nombre debe tener menos de 40 caracteres";
	}

	if (!isGenres.includes(true)) {
		error.genres = "El videojuego debe tener al menos 1 género";
	}

	if (!isPlatforms.includes(true)) {
		error.platforms = "El videojuego debe tener al menos 1 plataforma";
	}

	if (regexUrlImg.test(background_image) || regexImg.test(background_image)) {
		error.background_image = "";
	} else {
		error.background_image = "Debe ser una url de una imagen";
	}
	return error;
}
