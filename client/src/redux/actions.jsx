/* eslint-disable no-useless-catch */

import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAME_DETAIL = "GET_VIDEOGAME_DETAIL";
export const ON_SEARCH = "ON_SEARCH";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const GET_GENRES = "GET_GENRES";
export const FILTER_BY_GENRES = "FILTER_BY_GENRES";
export const ORDER_BY = "ORDER_BY";
export const FILTER_BY_ORIGEN = "FILTER_BY_ORIGEN";
export const ORDER_BY_RATING = "ORDER_BY_RATING";
export const CREATE_VIDEOGAME = "CREATE_VIDEOGAMES";
export const GET_PLATFORMS = "GET_PLATFORMS";

export const getVideogames = () => {
	return async function (dispatch) {
		const apiData = await axios.get("http://localhost:3001/videogames");
		const videogames = apiData.data;
		dispatch({ type: GET_VIDEOGAMES, payload: videogames });
	};
};

export const getDetail = (videogame) => ({
	type: GET_VIDEOGAME_DETAIL,
	payload: videogame,
});

export const getVideogameId = (id) => {
	return async function (dispatch) {
		try {
			const apiData = await axios.get(`http://localhost:3001/videogames/${id}`);
			const videogame = apiData.data;

			let obj;

			if (id.includes("-")) {
				obj = {
					id: videogame.id,
					name: videogame.name,
					description: videogame.description,
					background_image: videogame.background_image,
					released: videogame.released,
					rating: videogame.rating,
					platforms: videogame.platforms,
					genres: videogame.genres.map((e) => e.name + " ,"),
				};
			} else {
				obj = videogame;
			}
			dispatch(getDetail(obj));
		} catch (error) {
			throw error;
		}
	};
};

export const onSearch = (nameState) => {
	return async function (dispatch) {
		try {
			const { data } = await axios.get(
				`http://localhost:3001/videogames?name=${nameState}`
			);
			return dispatch({
				type: ON_SEARCH,
				payload: data,
			});
		} catch (error) {
			throw error;
		}
	};
};

export const cleanDetail = () => {
	return { type: CLEAN_DETAIL };
};

export const getGenres = () => {
	return async function (dispatch) {
		try {
			const apiData = await axios.get("http://localhost:3001/genres");
			return dispatch({
				type: GET_GENRES,
				payload: apiData.data,
			});
		} catch (error) {
			throw error;
		}
	};
};

export const getPlatforms = () => {
	return async function (dispatch) {
		try {
			const response = await axios.get("http://localhost:3001/platforms");
			const arrayObjetos = response.data.map((valor, indice) => {
				return { id: indice + 1, valor: valor };
			});
			return dispatch({
				type: GET_PLATFORMS,
				payload: arrayObjetos,
			});
		} catch (error) {
			throw error;
		}
	};
};

export const filterByGenres = (genres) => {
	return {
		type: FILTER_BY_GENRES,
		payload: genres,
	};
};

export const filterGames = (order) => {
	return {
		type: ORDER_BY,
		payload: order,
	};
};

export const filterOrigen = (order) => {
	return {
		type: FILTER_BY_ORIGEN,
		payload: order,
	};
};

export const orderBy = (params) => {
	return {
		type: ORDER_BY_RATING,
		payload: params,
	};
};

export const createVideogame = (payload) => {
	return async function (dispatch) {
		try {
			const response = await axios.post(
				"http://localhost:3001/videogames",
				payload
			);

			return dispatch({
				type: CREATE_VIDEOGAME,
				payload: response,
			});
		} catch (error) {
			// Aquí puedes manejar el error de acuerdo a tus necesidades
			alert(error.request.response);
		}
	};
};
