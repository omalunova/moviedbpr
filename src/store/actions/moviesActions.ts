import { Dispatch } from "redux";

export const API_KEY = '04f4733b64f435bf171d1c90539c050d';
export const BASE_URL = 'https://api.themoviedb.org/3';

export const setMovies = (movies: any[]) => ({
    type: 'SET_MOVIES',
    payload: movies
});

export const setGenres = (genres: any[]) => ({
    type: 'SET_GENRES',
    payload: genres
});

export const fetchMovies = (page: number = 1) => async (dispatch: Dispatch) => {
    try {
        const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}`);
        const data = await response.json();
        dispatch(setMovies(data.results));
    } catch (error) {
        console.log(error);
    }
};

export const fetchGenres = () => async (dispatch: Dispatch) => {
    try {
        const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
        const data = await response.json();
        dispatch(setGenres(data.genres));
    } catch (error) {
        console.log(error);
    }
};

export const fetchMoviesByGenre = (genreId: number) => async (dispatch: Dispatch) => {
    try {
        const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
        const data = await response.json();
        dispatch(setMovies(data.results));
    } catch (error) {
        console.log(error);
    }
}

export const searchMovies = (query: string) => async (dispatch: Dispatch) => {
    try {
        // const encodedQuery = encodeURIComponent(query);
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
        const data = await response.json();
        dispatch(setMovies(data.results));
    } catch (error) {
        console.log(error);
    }
}
