/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVideogame, getGenres, getPlatforms } from "../../redux/actions";
// import { useNavigate } from "react-router-dom";
import validation from "./validations";
import style from "./Form.module.css";

const Form = () => {
	const dispatch = useDispatch();

	const platforms = useSelector((state) => state.platforms);
	const genres = useSelector((state) => state.genres);

	// const navigate = useNavigate();

	const [form, setForm] = useState({
		name: "",
		background_image: "",
		description: "",
		platforms: [],
		released: "",
		rating: 0,
		genres: [],
	});

	const [error, setError] = useState({
		name: "",
		background_image: "",
		platforms: [],
		genres: [],
	});

	const [button, setButton] = useState("");
	const [checkboxGenres, setCheckboxGenres] = useState({});
	const [checkboxPlatforms, setCheckboxPlatforms] = useState({});

	useEffect(() => {
		dispatch(getPlatforms());
		dispatch(getGenres());
	}, [dispatch]);

	const handleChange = (event) => {
		const property = event.target.name;
		const value = event.target.value;

		setForm({ ...form, [property]: value });
		setError(
			validation({
				...form,
				[property]: value,
				checkboxGenres,
				checkboxPlatforms,
			})
		);
		setButton(value);
	};

	const handlePlatformChange = (event) => {
		const { value, checked } = event.target;
		if (checked) {
			setForm((form) => ({
				...form,
				platforms: [...form.platforms, value],
			}));
		} else {
			setForm((form) => ({
				...form,
				platforms: form.platforms.filter((p) => p !== value),
			}));
		}
		setCheckboxPlatforms({ ...checkboxPlatforms, [value]: checked });
	};
	useEffect(() => {
		setError(validation({ ...form, checkboxPlatforms, checkboxGenres }));
	}, [checkboxPlatforms, checkboxGenres]);

	const handleGenresChange = (event) => {
		const { value, checked } = event.target;
		if (checked) {
			setForm((form) => ({
				...form,
				genres: [...form.genres, value],
			}));
		} else {
			setForm((form) => ({
				...form,
				genres: form.genres.filter((genre) => genre !== value),
			}));
		}
		setCheckboxGenres({ ...checkboxGenres, [value]: checked });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!form.name) {
			alert("El campo nombre no puede estar vacio");
			return;
		}

		if (!form.background_image) {
			alert("El campo imagen no puede estar vacio");
			return;
		}

		if (error.background_image) {
			alert("El campo imagen debe ser una url");
			return;
		}

		if (!form.released) {
			alert("Debe seleccionar una fecha de lanzamiento");
			return;
		}

		if (error.genres) {
			alert("Debes seleccionar al menos un género");
			return;
		}
		if (error.platforms) {
			alert("Debes seleccionar al menos una plataforma");
			return;
		}

		if (!form.description) {
			alert("El campo descripción no puede estar vacio");
			return;
		}

		dispatch(getGenres(event.target.value));
		dispatch(createVideogame(form));

		setForm({
			name: "",
			background_image: "",
			description: "",
			platforms: [],
			released: "",
			rating: 0,
			genres: [],
		});
	};

	return (
		<div className={style.all}>
			<form
				noValidate
				onSubmit={(e) => handleSubmit(e)}
				className={style.container}
			>
				<div className={style.formContainer}>
					<label className={style.titulo}>Formulario de creación </label>
					<div className={style.name}>
						<label>Nombre: </label>
						<input
							className={style.input}
							type="text"
							value={form.name}
							onChange={handleChange}
							name="name"
						/>
						{error.name && <p className={style.errors}>{error.name}</p>}
					</div>
					<div className={style.image}>
						<label>Imagen: </label>
						<input
							className={style.input}
							type="text"
							value={form.background_image}
							onChange={handleChange}
							name="background_image"
						/>
						{error.background_image && (
							<p className={style.errors}>{error.background_image}</p>
						)}
					</div>
					<div className={style.detail}>
						<label>Descripción: </label>
						<input
							className={style.input}
							type="text"
							value={form.description}
							onChange={handleChange}
							name="description"
						/>
					</div>
					<div>
						<label className={style.platforms}>Plataforma:</label>
						{platforms?.map((p) => (
							<label className={style.label} key={p.valor}>
								<input
									className={style.check}
									type="checkbox"
									name="platforms"
									checked={form.platforms.includes(p.valor)}
									value={p.valor}
									onChange={handlePlatformChange}
								/>{" "}
								{p.valor}{" "}
							</label>
						))}
						{error.platforms && (
							<p className={style.errors}>{error.platforms}</p>
						)}
					</div>
					<div className={style.released}>
						<label>Fecha de lanzamiento: </label>
						<input
							className={style.input}
							type="date"
							value={form.released}
							onChange={handleChange}
							name="released"
						/>
					</div>
					<div className={style.rating}>
						<label>Rating (1-5): </label>
						<input
							className={style.input}
							type="range"
							step="0.1"
							min="0"
							max="5"
							value={form.rating}
							onChange={handleChange}
							name="rating"
						/>
					</div>
					<div>
						<label className={style.genres}>Géneros:</label>
						{genres?.map((genre) => (
							<label className={style.label} key={genre.name}>
								<input
									className={style.check}
									type="checkbox"
									name="genres"
									checked={form.genres.includes(genre.name)}
									value={genre.name}
									onChange={handleGenresChange}
								/>{" "}
								{genre.name}{" "}
							</label>
						))}
						{error.genres && <p className={style.errors}>{error.genres}</p>}
					</div>
					<div className={style.buttonContainer}>
						<button
							className={style.button}
							type="submit"
							disabled={!button}
							style={{ backgroundColor: !button ? "red" : "transparent" }}
						>
							CREAR
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Form;

// Nombre.
// background_imagen.
// Descripción.
// Plataformas.
// Fecha de lanzamiento.
// Rating.
// Posibilidad de seleccionar/agregar varios géneros en simultáneo.
// Botón para crear el nuevo videojuego.
