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
	CREATE_VIDEOGAME,
	GET_PLATFORMS,
} from "./actions";

const initialState = {
	videogames: [],
	allGames: [],
	genres: [],
	detail: {},
	filtered: [],
	platforms: [],
	videogamesFiltered: [],
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

		case GET_PLATFORMS:
			return { ...state, platforms: action.payload };

		case CREATE_VIDEOGAME:
			return {
				...state,
				videogames: [...state.videogames, action.payload],
			};

		case FILTER_BY_ORIGEN:
			let videogamesOrigin = [...state.allGames];
			let videogamesSearch = [...state.videogamesFiltered];

			if (videogamesSearch.length > 0) {
				if (action.payload === "bd") {
					videogamesOrigin = videogamesSearch.filter((game) => game.createdBd);
				} else if (action.payload === "api") {
					videogamesOrigin = videogamesSearch.filter((game) => !game.createdBd);
				} else if (action.payload === "All") {
					videogamesOrigin = [...state.videogamesFiltered];
				}
			} else {
				if (action.payload === "bd") {
					videogamesOrigin = videogamesOrigin.filter((game) => game.createdBd);
				} else if (action.payload === "api") {
					videogamesOrigin = videogamesOrigin.filter((game) => !game.createdBd);
				} else if (action.payload === "All") {
					videogamesOrigin = [...state.videogames];
				} else {
					window.alert("No hay coincidencias");
				}
			}

			return {
				...state,
				filtered: videogamesOrigin,
			};

		case ON_SEARCH:
			try {
				return {
					...state,
					videogamesFiltered: [...action.payload],
					filtered: [...action.payload],
				};
			} catch (error) {
				throw new Error("Videojuego no encontrado");
			}

		case ORDER_BY:
			let videogamesFilteredCopy = [...state.filtered];
			let allVideogamesCopy = [...state.videogames];
			let videogamesOnSearch = [...state.videogamesFiltered];
			let videogamesSort;

			if (videogamesOnSearch.length > 0) {
				if (action.payload === "Original") {
					videogamesSort = videogamesOnSearch;
				} else if (action.payload === "A") {
					videogamesSort = videogamesOnSearch.sort((a, b) =>
						a.name.localeCompare(b.name)
					);
				} else if (action.payload === "D") {
					videogamesSort = videogamesOnSearch.sort((a, b) =>
						a.name.localeCompare(b.name)
					);
					videogamesSort.reverse();
				}
			} else {
				if (videogamesFilteredCopy.length > 0) {
					videogamesSort = videogamesFilteredCopy.sort((a, b) =>
						a.name.localeCompare(b.name)
					);
				} else {
					videogamesFilteredCopy = allVideogamesCopy.sort((a, b) =>
						a.name.localeCompare(b.name)
					);
				}
				if (action.payload === "A") {
					videogamesSort = videogamesFilteredCopy;
				} else if (action.payload === "D") {
					videogamesSort.reverse();
				} else if (action.payload === "Original") {
					videogamesSort = initialState.videogames;
				}
			}

			return {
				...state,
				filtered: videogamesSort,
			};

		case ORDER_BY_RATING:
			let videogamesRating = [...state.filtered];
			let allVideogamesRating = [...state.videogames];
			let videoGamesSearchBar = [...state.videogamesFiltered];
			let videogamesSortRating;

			if (videoGamesSearchBar.length > 0) {
				if (action.payload === "Original") {
					videogamesSortRating = videoGamesSearchBar;
				} else if (action.payload === "LR") {
					videogamesSortRating = videogamesRating.sort(
						(a, b) => b.rating - a.rating
					);
					videogamesSortRating.reverse();
				} else if (action.payload === "TR") {
					videogamesSortRating = videogamesRating.sort(
						(a, b) => b.rating - a.rating
					);
				}
			} else {
				if (videogamesRating.length > 0) {
					videogamesSortRating = videogamesRating.sort(
						(a, b) => b.rating - a.rating
					);
				} else {
					videogamesSortRating = allVideogamesRating.sort(
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
			}

			return {
				...state,
				filtered: videogamesSortRating,
			};

		case FILTER_BY_GENRES:
			let videogamesFilterGenre = [...state.videogames];
			let videogamesFilterSearch = [...state.videogamesFiltered];

			if (videogamesFilterSearch.length > 0) {
				if (action.payload === "All") {
					videogamesFilterGenre = videogamesFilterSearch;
				} else {
					videogamesFilterGenre = videogamesFilterSearch.filter((game) =>
						game.genres.includes(action.payload)
					);
					if (videogamesFilterGenre.length === 0 && action.payload !== "All") {
						window.alert("No hay coincidencias");
						videogamesFilterGenre = [...state.videogamesFiltered];
					}
				}
			} else {
				// if (videogamesFilterGenre.length === 0 && action.payload !== "All") {
				// 	window.alert("No hay coincidencias");
				// 	videogamesFilterGenre = [...state.videogames];
				// }
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
				}
				if (videogamesFilterGenre.length === 0 && action.payload !== "All") {
					window.alert("No hay coincidencias");
					videogamesFilterGenre = [...state.videogames];
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
