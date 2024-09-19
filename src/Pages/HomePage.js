import React, { useEffect, useState } from 'react';
import TrendingMovies from '../Components/TrendingMovies';
import { fetchTrendingMovies, fetchUpcomingMovies, fetchTopRatedMovies } from '../Api/MoviesDB';
import MovieCard from '../Components/MovieCard';
import Loading from '../Components/Loading'

function HomePage() {
    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMovies();
    }, []);

    const getMovies = async () => {
        try {
            const [trendingData, upcomingData, topRatedData] = await Promise.all([
                fetchTrendingMovies(),
                fetchUpcomingMovies(),
                fetchTopRatedMovies(),
            ]);

            if (trendingData && trendingData.results) setTrending(trendingData.results);
            if (upcomingData && upcomingData.results) setUpcoming(upcomingData.results);
            if (topRatedData && topRatedData.results) setTopRated(topRatedData.results);

        } catch (error) {
            console.error("Error loading movies:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <div className='container'>
                    <TrendingMovies data={trending} />
                    <MovieCard title='Upcoming' movies={upcoming} />
                    <MovieCard title='Top Rated' movies={topRated} />
                </div>
            )}
        </div>
    );
}

export default HomePage;
