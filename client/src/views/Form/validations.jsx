export default function validation({
	name,
	platforms,
	genres,
	background_image,
}) {
	let error = {};

	const regexUrlImg = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/i;

	if (!name) {
		error.name = "El nombre no puede estar vacío";
	}
	if (name.length > 40) {
		error.name = "El nombre debe tener menos de 40 caracteres";
	}
	if (genres.length > 4) {
		error.genres = "El videojuego no puede tener más de 4 géneros";
	}
	if (genres.length === 0) {
		error.genres = "El videojuego debe tener al menos 1 género";
	}
	if (platforms.length === 0) {
		error.platforms = "El videojuego debe tener al menos 1 plataforma";
	}
	if (platforms.length > 10) {
		error.platforms = "El videojuego no puede tener más de 10 plataformas";
	}
	if (!regexUrlImg.test(background_image)) {
		error.background_image = "Debe ser una url de una imagen";
	}
	return error;
}
