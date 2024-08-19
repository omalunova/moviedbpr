import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store";
import {fetchMovies, fetchMoviesByGenre} from "@/store/actions/moviesActions";

const GenreFilter = () => {
    const genres = useSelector((state: RootState) => state.movies.genres)
    const [selectGenre, setSelectGenre] = useState<number | null>(null);
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode)
    const dispatch = useDispatch<AppDispatch>();

    const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const genreId = parseInt(event.target.value);
        setSelectGenre(genreId);
        dispatch(fetchMoviesByGenre(genreId));
    };

    useEffect(() => {
        if(selectGenre === null) {
            dispatch(fetchMovies())
        } else {
            dispatch(fetchMoviesByGenre(selectGenre))
        }
    }, [selectGenre, dispatch])
    return (
        <div>
            <select className={`w-full p-2 border border-gray-300 rounded-md bg-white focus:-ring-2 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}  focus:ring-blue-500`} onChange={handleGenreChange} value={selectGenre || ''} name="" id="">
                <option value="">All Genres</option>
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
            </select>
        </div>
    );
};

export default GenreFilter;