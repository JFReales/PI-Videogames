/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useCallback, useEffect } from "react";
import style from "./Paginado.module.css";

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
		<div className={style.paginas}>
			<nav>
				<ul className={style.buttonContainer}>
					{numeroDePaginas.map((numero) => (
						<button
							key={numero}
							onClick={() => handlerPagina(numero)}
							className={style.button}
						>
							{numero}
						</button>
					))}
				</ul>
			</nav>
		</div>
	);
};

export default Paginado;
