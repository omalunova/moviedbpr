import React, {FC, useState, useEffect} from "react";
// @ts-ignore
import StarsRating from "react-star-ratings";
import {Badge} from "reactstrap";
import s from './moviesListCard.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store";
import {useRouter} from "next/navigation";
import {fetchMoviesByGenre} from "@/store/actions/moviesActions";

interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    vote_average: number;
    genre_ids: number[];
}

interface MoviesListCardProps {
    movie: Movie;
}

const MoviesListCard: FC<MoviesListCardProps> = ({movie}) => {
    const [showGenres, setShowGenres] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode)
    console.log(isDarkMode)
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const genres = useSelector((state: RootState) => state.movies.genres);

    const toggleShowGenres = () => {
        setShowGenres(!showGenres);
    }

    const getGenreName = (genreId: number) => {
        const genre = genres.find((genre) => genre.id === genreId);
        return genre ? genre.name : '';
    }

    const handleCardClick = () => {
        if (isClient) {
            router.push(`/movies/${movie.id}`);
        }
    }

    const handleGenreClick = (genreId: number) => {
        dispatch(fetchMoviesByGenre(genreId))
    }

    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    return (
        <div
            className={` ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'} h-100 shadow-lg rounded-lg p-4 overflow-hidden transform hover:scale-105 transition duration-300`}>
            <img className="w-full h-85 object-cover cursor-pointer" onClick={handleCardClick} src={posterUrl}
                 alt={movie.title}/>
            <div className={'p-4'}>
                <h3 className="text-lg font-semibold">{movie.title}</h3>
                <StarsRating
                    rating={movie.vote_average / 2}
                    starRatedColor="gold"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="2px"
                />
            </div>
            <p className="mt-2 text-sm">
                {movie.overview.length > 100 ? `${movie.overview.substring(0, 100)}...` : movie.overview}
            </p>
            <div className="mt-4 flex gap-3">
                {movie.genre_ids.map((genresId) => (
                    <span key={genresId} className="cursor-pointer bg-blue-500 text-white px-2 py-1 rounded-full text-xs mt-2 hover:bg-blue-600 transition" onClick={() => handleGenreClick(genresId)}>{getGenreName(genresId)}</span>
                ))}
            </div>
        </div>
    );
};

export default MoviesListCard;


{/*<Badge onClick={(e) => {*/}
{/*    e.stopPropagation();*/}
{/*    toggleShowGenres();*/}
{/*}} color="primary" className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded-full">*/}
{/*    {movie.genre_ids.length}*/}
{/*</Badge>*/}