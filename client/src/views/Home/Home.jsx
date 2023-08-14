/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	cleanDetail,
	filterByGenres,
	filterGames,
	filterOrigen,
	getGenres,
	getVideogames,
	orderBy,
} from "../../redux/actions";
import style from "./Home.module.css";
import Paginado from "../../components/Paginado/Paginado";
import VideogamesContainer from "../../components/VideogamesContainer/VideogamesContainer";

const Home = () => {
	const dispatch = useDispatch();

	let allVideogames = useSelector((state) => state.videogames);
	let filteredGames = useSelector((state) => state.filtered);
	let allGenres = useSelector((state) => state.genres);

	filteredGames?.length > 0 && (allVideogames = filteredGames);

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
		dispatch(getGenres());

		return () => dispatch(cleanDetail());
	}, [dispatch]);

	const handleOrigen = (event) => {
		dispatch(filterOrigen(event.target.value));
	};

	const handleOrder = (event) => {
		dispatch(filterGames(event.target.value));
	};

	const handleRating = (event) => {
		dispatch(orderBy(event.target.value));
	};

	const handleGenres = (event) => {
		dispatch(filterByGenres(event.target.value));
	};

	return (
		<div className={style.all}>
			<div className={style.home}>
				<div>
					<div className={style.filters}>
						<div className={style.filter}>
							Origen:
							<select className={style.select} onChange={handleOrigen}>
								<option value="All">All</option>
								<option value="api">Original</option>
								<option value="bd">Created</option>
							</select>
						</div>
						<div className={style.filter}>
							Name:
							<select className={style.select} onChange={handleOrder}>
								<option value="Original">Original</option>
								<option value="A">A - Z</option>
								<option value="D">Z - A</option>
							</select>
						</div>
						<div className={style.filter}>
							Rating:
							<select className={style.select} onChange={handleRating}>
								<option value="Original">Original</option>
								<option value="TR">Top Rating</option>
								<option value="LR">Low Rating</option>
							</select>
						</div>
						<div className={style.filter}>
							Genres:
							<select className={style.select} onChange={handleGenres}>
								<option value="All">All Genres</option>
								{allGenres?.map((genres) => (
									<option value={genres.name} key={genres.name}>
										{genres.name}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className={style.paginado}>
						<Paginado
							pagina={pagina}
							videogamesPorPagina={videogamesPorPagina}
							allVideogames={allVideogames.length}
							paginaActual={paginaActual}
						/>
					</div>
					<div className={style.videogamesContainer}>
						<VideogamesContainer videogamesActual={videogamesActual} />
					</div>
					<div className={style.paginado}>
						<Paginado
							pagina={pagina}
							videogamesPorPagina={videogamesPorPagina}
							allVideogames={allVideogames.length}
							paginaActual={paginaActual}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
