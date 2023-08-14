import { useState } from "react";
import { onSearch } from "../../redux/actions";
import { useDispatch } from "react-redux";
import style from "./SearchBar.module.css";

const SearchBar = () => {
	const dispatch = useDispatch();

	const [nameState, setNameState] = useState("");
	const [error, setError] = useState("");

	const handleSearch = (event) => {
		setNameState(event.target.value);
		setError("");
	};

	const handleClick = async () => {
		if (nameState.trim() === "") {
			setError("Ingresar el nombre del juego que busca");
		} else {
			try {
				await dispatch(onSearch(nameState));
			} catch (error) {
				setError("Perdón! No conocemos el nombre de ese juego");
			}
		}
	};
	return (
		<div className={style.container}>
			<div>
				<input
					className={style.input}
					type="search"
					placeholder=" ¿Qué juego buscas?"
					value={nameState}
					onChange={handleSearch}
				/>
				{error && <p className={style.error}>{error}</p>}
			</div>
			<div>
				<button
					className={style.button}
					onClick={() => {
						handleClick();
						setNameState("");
					}}
				>
					Buscar
				</button>
			</div>
		</div>
	);
};

export default SearchBar;
