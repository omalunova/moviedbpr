import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store";
import {fetchMovies, searchMovies} from "@/store/actions/moviesActions";

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    };

    const handleSearch = () => {
        if (query.trim()) {
            dispatch(searchMovies(query));
        }

    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSearch()

    return (
        <div className={'flex items-center space-x-4'}>
            <input className={'w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:right-2 focus:ring-blue-500'} value={query} onChange={handleInputChange} onKeyPress={handleKeyPress} type="text" name="" id=""/>
            <button className={'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300'} onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;