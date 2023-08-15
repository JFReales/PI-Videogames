import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = () => {
	return (
		<div>
			<div className={style.mainContainer}>
				<Link to="/home">
					<button className={style.link}>INICIO</button>
				</Link>
				<Link to="/create">
					<button className={style.link}>AGREGÁ TU JUEGO</button>
				</Link>
				<div className={style.searchBar}>
					<SearchBar />
				</div>
				<div>
					<button
						className={style.reset}
						onClick={() => window.location.reload()}
					>
						Reiniciar
					</button>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
