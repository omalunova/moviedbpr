import React, { FC, useEffect, useState } from 'react';
import '@/app/globals.css';
import { useRouter } from "next/router";
import { API_KEY, BASE_URL } from "@/store/actions/moviesActions";
import { Badge } from "reactstrap";
import ReactPlayer from 'react-player/youtube';

const MovieDetails: FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [movie, setMovie] = useState<any>(null);
    const [genres, setGenres] = useState<string[]>([]);
    const [trailer, setTrailer] = useState<string | null>(null);
    const [showGenres, setShowGenres] = useState(false);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            if (id) {
                const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
                const data = await response.json();
                setMovie(data);

                const genreName = data.genres.map((genre: { id: number, name: string }) => genre.name);
                setGenres(genreName);

                const videoResponse = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
                const videoData = await videoResponse.json();
                const trailerData = videoData.results.find((result: { type: string }) => result.type === 'Trailer');

                if (trailerData) {
                    setTrailer(`https://www.youtube.com/watch?v=${trailerData.key}`);
                } else {
                    setTrailer(null);
                }
            }
        };
        fetchMovieDetails();
    }, [id]);

    const toggleGenres = () => {
        setShowGenres(!showGenres);
    };

    return (
        <div
            className={"min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex justify-center items-center"}>
            {movie ? (
                <div className={'container mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-4xl'}>
                    <h1 className={'text-3xl font-bold mb-4'}>{movie.title}</h1>
                    <p className={'mb-4'}>{movie.overview}</p>

                    <div className="mb-4 flex">
                        <Badge
                            onClick={toggleGenres}
                            className={`${showGenres ? 'bg-blue-900' : 'bg-blue-500'} text-white mr-2 px-3 py-1 rounded-full cursor-pointer`}
                        >
                            {showGenres ? `${genres.length}` : `Genres: ${genres.length}`}
                        </Badge>

                        {showGenres && (
                            <div className={'transition-all duration-300 ease-in-out'}>
                                <ul className={'list-inside flex gap-2'}>
                                    {genres.map((genre, index) => (
                                        <li key={index} className={'bg-blue-500 text-white mr-2 px-3 py-1 rounded-full'}>
                                            {genre}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    {trailer ? (
                        <div className={'mt-6'}>
                            <h2 className={'text-2xl font-semibold mb-4'}>Watch Trailer</h2>
                            <ReactPlayer url={trailer} controls={true} width="100%" height="400px" />
                        </div>
                    ) : (
                        <p>No trailer available.</p>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default MovieDetails;
