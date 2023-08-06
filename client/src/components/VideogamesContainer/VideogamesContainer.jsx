/* eslint-disable react/prop-types */
import Videogame from "../Videogame/Videogame";
import style from "./VideogamesContainer.module.css";

const VideogamesContainer = ({ videogamesActual }) => {
	// const videogames = useSelector((state) => state.videogames);
	// id, name, background_image, genres, rating
	return (
		<div className={style.container}>
			{videogamesActual?.map((video) => {
				return (
					<Videogame
						key={video.id}
						id={video.id}
						name={video.name}
						background_image={video.background_image}
						genres={video.genres}
						rating={video.rating}
					/>
				);
			})}
		</div>
	);
};

export default VideogamesContainer;
