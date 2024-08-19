'use client';

import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMovies, fetchGenres} from '@/store/actions/moviesActions';
import {RootState, AppDispatch} from '@/store';
import Pagination from "@/components/Pagination/Pagination";
import dynamic from "next/dynamic";
import SearchBar from "@/components/SearchBar/SearchBar";

const MoviesListCard = dynamic(() => import('@/components/MoviesListCard/MoviesListCard'), {ssr: false});

const MoviesList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const movies = useSelector((state: RootState) => state.movies.movies) || [];
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode)
    const [isLoading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;

    useEffect(() => {
        const loadMovies = async () => {
            setLoading(true)
            await dispatch(fetchGenres());
            await dispatch(fetchMovies(currentPage));
            setLoading(false)
        }
        loadMovies()
    }, [dispatch, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}>
            <div className={'container mx-auto py-10'}>
                {isLoading ? (
                    <div className="flex justify-center items-center min-h-screen">
                        <div
                            className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                    </div>
                ): (
                    movies.length > 0 ? (
                        <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'}>
                            {movies.map((movie) => (
                                <MoviesListCard key={movie.id} movie={movie}/>
                            ))}
                        </div>
                    ) : (
                        <div className={'flex justify-center items-center min-h-screen'}>
                            <p className={'text-center text-lg text-gray-500'}>No movies found</p>
                        </div>
                    )
                )}

                <div className={'mt-8'}>
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
                </div>
            </div>
        </div>
    );
};

export default MoviesList;
