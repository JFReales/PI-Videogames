/* eslint-disable no-unused-vars */
import VideogamesContainer from "../../components/VideogamesContainer/VideogamesContainer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paginado from "../../components/Paginado/Paginado";
import {
	cleanDetail,
	filterByGenres,
	filterGames,
	filterOrigen,
	getGenres,
	getVideogames,
	orderBy,
} from "../../redux/actions";

const Home = () => {
	const dispatch = useDispatch();

	let allVideogames = useSelector((state) => state.videogames);
	let filteredGames = useSelector((state) => state.filtered);
	let allGenres = useSelector((state) => state.genres);

	filteredGames.length > 0 && (allVideogames = filteredGames);

	const [paginaActual, setPaginaActual] = useState(1);
	const [videogamesPorPagina, setVideogamesPorPagina] = useState(15);
	const indiceUltimoVideogame = paginaActual * videogamesPorPagina; // 15
	const indicePrimerVideogame = indiceUltimoVideogame - videogamesPorPagina; // 0
	// console.log(allVideogames);
	const videogamesActual =
		allVideogames &&
		allVideogames.slice(indicePrimerVideogame, indiceUltimoVideogame);

	const pagina = (numeroPagina) => {
		setPaginaActual(numeroPagina);
	};

	useEffect(() => {
		dispatch(getVideogames());
		dispatch(getGenres);

		return () => dispatch(cleanDetail());
	}, [dispatch]);

	const origenHandler = (event) => {
		dispatch(filterOrigen(event.target.value));
	};

	const orderHandler = (event) => {
		dispatch(filterGames(event.target.value));
	};

	const ratingHandler = (event) => {
		dispatch(orderBy(event.target.value));
	};

	const genresHandler = (event) => {
		dispatch(filterByGenres(event.target.value));
	};

	return (
		<div>
			<div>
				<div>
					<select onChange={origenHandler}>
						<option value="All">All</option>
						<option value="api">Original</option>
						<option value="bd">Created</option>
					</select>
					<select onChange={orderHandler}>
						<option value="A">Original</option>
						<option value="Original">A - Z</option>
						<option value="D">Z - A</option>
					</select>
					<select onChange={ratingHandler}>
						<option value="Original">Original</option>
						<option value="TR">Top Rating</option>
						<option value="LR">Low Rating</option>
					</select>
					<select onChange={genresHandler}>
						<option value="All">All Genres</option>
						{allGenres.map((genres) => (
							<option value={genres.name} key={genres.name}>
								{genres.name}
							</option>
						))}
					</select>
				</div>
			</div>
			<VideogamesContainer videogamesActual={videogamesActual} />
			<Paginado
				pagina={pagina}
				videogamesPorPagina={videogamesPorPagina}
				allVideogames={allVideogames.length}
				paginaActual={paginaActual}
			/>
		</div>
	);
};

export default Home;
