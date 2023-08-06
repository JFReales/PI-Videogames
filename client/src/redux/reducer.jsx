/* eslint-disable no-case-declarations */
import {
	GET_VIDEOGAMES,
	GET_VIDEOGAME_DETAIL,
	CLEAN_DETAIL,
	ON_SEARCH,
	GET_GENRES,
	FILTER_BY_ORIGEN,
	ORDER_BY,
	ORDER_BY_RATING,
	FILTER_BY_GENRES,
} from "./actions";

const initialState = {
	videogames: [],
	allGames: [],
	genres: [],
	detail: {},
	filtered: [],
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_VIDEOGAMES:
			return { ...state, videogames: action.payload, allGames: action.payload };

		case GET_VIDEOGAME_DETAIL:
			return { ...state, detail: action.payload };

		case CLEAN_DETAIL:
			return { ...state, detail: {}, genres: [] };

		case GET_GENRES:
			return { ...state, genres: action.payload };

		case FILTER_BY_ORIGEN:
			let videogamesOrigin = [...state.allGames];

			if (action.payload === "bd") {
				videogamesOrigin = videogamesOrigin.filter((game) => game.createdBd);
			} else if (action.payload === "api") {
				videogamesOrigin = videogamesOrigin.filter((game) => !game.createdBd);
			} else if (action.payload === "All") {
				videogamesOrigin = [...state.videogames];
			} else {
				window.alert("No hay coincidencias");
			}

			return {
				...state,
				filtered: videogamesOrigin,
			};

		case ON_SEARCH:
			try {
				return {
					...state,
					videogames: [...action.payload],
					filtered: [...action.payload],
				};
			} catch (error) {
				throw new Error("Personaje no enontrado");
			}

		case ORDER_BY:
			let videogamesFilteredCopy = [...state.filtered];
			let allVideogamesCopy = [...state.videogames];
			let videogamesSort;

			if (videogamesFilteredCopy.length > 0) {
				videogamesSort = videogamesFilteredCopy.sort((a, b) =>
					a.name.localeCompare(b.name)
				);
			} else {
				videogamesFilteredCopy = allVideogamesCopy.sort((a, b) =>
					a.name.localeCompare(b.name)
				);
			}

			if (action.payload === "Original") {
				videogamesSort = videogamesFilteredCopy;
			}

			if (action.payload === "D") {
				videogamesSort.reverse();
			} else if (action.payload === "A") {
				videogamesSort = initialState.videogames;
			}

			return {
				...state,
				filtered: videogamesSort,
			};

		case ORDER_BY_RATING:
			let videogamesRating = [...state.filtered];
			let allVideogamesRating = [...state.videogames];
			let videogamesSortRating;

			if (videogamesRating.length > 0) {
				videogamesSortRating = videogamesRating.sort(
					(a, b) => b.rating - a.rating
				);
			} else {
				videogamesRating = allVideogamesRating.sort(
					(a, b) => b.rating - a.rating
				);
			}

			if (action.payload === "LR") {
				videogamesSortRating.reverse();
			} else if (action.payload === "Original") {
				videogamesSortRating = initialState.videogames;
			} else if (action.payload === "TR") {
				videogamesSortRating;
			}

			return {
				...state,
				filtered: videogamesSortRating,
			};

		case FILTER_BY_GENRES:
			let videogamesFilterGenre = [...state.filtered];

			if (videogamesFilterGenre.length > 0) {
				videogamesFilterGenre = videogamesFilterGenre.filter((game) =>
					game.genres.includes(action.payload)
				);
			} else {
				videogamesFilterGenre = state.videogames.filter((game) =>
					game.genres.includes(action.payload)
				);
			}

			if (action.payload === "All") {
				videogamesFilterGenre = initialState.videogames;
			} else {
				if (
					videogamesFilterGenre.length === 0 &&
					videogamesFilterGenre !== "All"
				) {
					window.alert("No hay coincidencias");
					videogamesFilterGenre = [...state.filtered];
				}
			}
			return {
				...state,
				filtered: videogamesFilterGenre,
			};

		default:
			return { ...state };
	}
};

export default rootReducer;
