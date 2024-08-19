import { configureStore } from '@reduxjs/toolkit';
import { themeReducer } from './reducers/themeReducer';
import { moviesReducer } from './reducers/moviesReducer';

const rootReducer = {
    theme: themeReducer,
    movies: moviesReducer,
};

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
