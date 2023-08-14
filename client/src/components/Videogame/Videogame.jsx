import style from "./Videogame.module.css";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Videogame = ({ id, name, background_image, genres, rating }) => {
	return (
		<div className={style.videogame}>
			<div className={style.border}>
				<p className={style.name}>{name}</p>
				<img src={background_image} alt={name} className={style.image} />
				<p className={style.genres}>Genres:{genres}</p>
				<p className={style.rating}>Rating:{rating}</p>
				<Link to={`/detail/${id}`} className={style.link}>
					<button className={style.button}>Más información</button>
				</Link>
			</div>
		</div>
	);
};

export default Videogame;
