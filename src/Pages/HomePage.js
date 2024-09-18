import React, { useEffect, useState } from 'react';
import TrendingMovies from '../Components/TrendingMovies';
import { fetchTrendingMovies } from '../Api/MoviesDB';

function HomePage() {
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTrendingMovies();
    }, []);

    const getTrendingMovies = async () => {
        try {
            const data = await fetchTrendingMovies();
            if (data && data.results) setTrending(data.results);
        } catch (error) {
            console.error("Error loading trending movies:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <TrendingMovies data={trending} />

            )}
        </div>
    );
}

export default HomePage;
