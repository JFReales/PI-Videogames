import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { cleanDetail, getVideogameId } from "../../redux/actions";
import style from "./Detail.module.css";

function VideogameDetail() {
	const dispatch = useDispatch();

	const gameDetail = useSelector((state) => state.detail);

	const { id } = useParams();

	useEffect(() => {
		dispatch(getVideogameId(id));
		return () => {
			dispatch(cleanDetail());
		};
	}, [id, dispatch]);

	return (
		<body className={style.all}>
			<div className={style.container}>
				<div className={style.detailContainer}>
					<div>
						<p className={style.name}>{gameDetail.name}</p>
					</div>
					<div>
						<p className={style.detail}>{gameDetail.description}</p>
					</div>
					<img
						src={gameDetail.background_image}
						alt={gameDetail.name}
						className={style.image}
					/>
					<div>
						<label className={style.platforms}>
							Platforms:
							<ul>
								{gameDetail.platforms?.map((pla) => {
									return <li key={pla}>{pla}</li>;
								})}
							</ul>
						</label>
					</div>
					<div>
						<label className={style.genres}>
							Genres:
							<ul>
								{gameDetail.genres?.map((gen) => {
									return <li key={gen}>{gen}</li>;
								})}
							</ul>
						</label>
					</div>
					<div>
						<p>Rating:{gameDetail.rating}</p>
					</div>
					<div>
						<p>Released:{gameDetail.released}</p>
					</div>
				</div>
			</div>
		</body>
	);
}

export default VideogameDetail;
