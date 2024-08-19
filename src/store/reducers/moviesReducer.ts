import { Reducer, AnyAction } from 'redux';

interface MovieState {
    movies: any[];
    genres: any[];
}

const initialState: MovieState = {
    movies: [],
    genres: [],
};

export const moviesReducer: Reducer<MovieState, AnyAction> = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return {
                ...state,
                movies: action.payload,
            };
        case 'SET_GENRES':
            return {
                ...state,
                genres: action.payload,
            };
        default:
            return state;
    }
};
