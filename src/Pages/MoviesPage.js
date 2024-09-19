import React, { useState, useEffect } from 'react';
import { fetchMoviesDetails, image500, fetchMoviesCredits, fetchSimilarMoviesDetails } from '../Api/MoviesDB';
import { useParams } from 'react-router-dom';
import Loading from '../Components/Loading';
import CastPlay from '../Components/Castplay';
import SimilarMovies from '../Components/SimilarMovies';

export default function MoviesPage() {
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [loading, setLoading] = useState(true); 
    const { id } = useParams();

    useEffect(() => {
        const getMovieData = async () => {
            try {
                // Fetch movie details, credits, and similar movies in parallel
                const [movieDetails, movieCredits, movieSimilarMovies] = await Promise.all([
                    fetchMoviesDetails(id),
                    fetchMoviesCredits(id),
                    fetchSimilarMoviesDetails(id)
                ]);

                if (movieDetails) setMovie(movieDetails);
                if (movieCredits && movieCredits.cast) setCast(movieCredits.cast);
                if (movieSimilarMovies && movieSimilarMovies.results) setSimilarMovies(movieSimilarMovies.results);
            } catch (error) {
                console.error('Error fetching movie details or credits:', error);
            } finally {
                setLoading(false); 
            }
        };

        getMovieData();
    }, [id]);

    if (loading) return <Loading />;

    if (!movie) return <p>Movie details not available.</p>;

    return (
        <main className='bg-gray-900 text-white'>
            <section className='flex flex-col lg:flex-row justify-between items-center mx-4 min-h-screen'>
                <div className='container'>
                    <div className='row'>
                        {/* Movie Poster */}
                        <div className='col-lg-4 text-center mb-8 lg:mb-0'>
                            <img 
                                src={movie.poster_path ? `${image500}${movie.poster_path}` : '/path/to/placeholder.jpg'} 
                                alt={movie.title || 'Movie Poster'} 
                                className='rounded-lg mb-4 shadow-lg' 
                            />
                        </div>

                        {/* Movie Details */}
                        <div className='col-lg-8 flex items-center' data-aos='fade-left'>
                            <div>
                                <p className='text-6xl font-bold mb-4'>{movie.title || 'Title Not Available'}</p>
                                <p className='mb-8 text-justify'>{movie.overview || 'Overview not available.'}</p>

                                {/* Status, Release Year, Runtime */}
                                <p className='mb-4'>
                                    {movie.status ? `${movie.status} • ` : ''} 
                                    {movie.release_date?.split('-')[0]} • 
                                    {movie.runtime ? `${movie.runtime} min` : 'N/A'}
                                </p>

                                {/* Genres */}
                                <div className='mb-6'>
                                    {movie.genres?.length > 0 ? (
                                        movie.genres.map((genre, index) => {
                                            const showDot = index + 1 !== movie.genres.length;
                                            return (
                                                <span key={genre.id}>
                                                    {genre.name}{showDot && ' • '}
                                                </span>
                                            );
                                        })
                                    ) : <span>No genres available</span>}
                                </div>

                                {/* Budget & Revenue */}
                                {movie.budget>0 && (
                                    <p>Budget: <span>${movie.budget.toLocaleString()}</span></p>
                                )}
                                {movie.revenue>0 && (
                                    <p>Revenue: <span>${movie.revenue.toLocaleString()}</span></p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Production Companies */}
                    <div className='py-8'>
                        <p className='text-3xl font-bold mb-6'>Production</p>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-gray-800 rounded-lg p-6'>
                            {movie.production_companies?.length > 0 ? (
                                movie.production_companies.map((company) => (
                                    <div key={company.id} className='text-center'>
                                        {
                                            <p className='text-2xl font-semibold font-mono'>{company.name}</p>
                                        }
                                    </div>
                                ))
                            ) : (
                                <p>No production companies available</p>
                            )}
                        </div>
                    </div>

                    {/* Cast Section */}
                    <div className='py-8'>
                        {cast.length>0 &&<CastPlay title='Top Cast' cast={cast} />}
                    </div>
                    {/* Similar Movies Section */}
                    <div className='py-8'>
                        {similarMovies.length>0 &&<SimilarMovies title='Similar Movies' similarMovies={similarMovies} />}
                    </div>
                </div>
            </section>
        </main>
    );
}
