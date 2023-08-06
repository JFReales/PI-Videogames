/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useCallback, useEffect } from "react";

const Paginado = ({
	videogamesPorPagina,
	allVideogames,
	paginaActual,
	pagina,
}) => {
	const numeroDePaginas = [];

	let paginasTotales = Math.ceil(allVideogames / videogamesPorPagina);
	for (let i = 1; i <= paginasTotales; i++) {
		numeroDePaginas.push(i);
	}

	const handlerPagina = useCallback(
		(numero) => {
			pagina(numero);
		},
		[pagina]
	);

	useEffect(() => {
		if (paginaActual > numeroDePaginas.length) {
			handlerPagina(1);
		}
	}, [handlerPagina, paginaActual, paginasTotales]);

	return (
		<nav>
			<ul>
				{numeroDePaginas.map((numero) => (
					<li key={numero}>
						<button
							onClick={() => handlerPagina(numero)}
							className={`${numero === paginaActual} ? ""`}
						>
							{numero}
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Paginado;
