import React, { useState, useEffect } from 'react';
import { fetchTrendingMovies, image500 } from '../Api/MoviesDB';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from './Loading';

export default function TrendingMovies({ data }) {
    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const [trending, setTrending] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getTrendingMovies();
    }, []);

    const getTrendingMovies = async () => {
        try {
            const data = await fetchTrendingMovies();
            if (data && data.results) {
                setTrending(data.results);
            }
        } catch (err) {
            setError('Failed to fetch trending movies');
            console.error(err);
        }
    };

    if (error) return (<><Loading /></>);

    return (
        <main className='container'>
            <p className='text-4xl font-bold text-white'>Trending</p>
            <section className='py-2'>
                <Slider {...settings}>
                    {trending.map((item) => (
                        <div key={item.id}>
                            <div>
                                <Link to={`/movie/${item.id}`}>
                                    <img
                                        src={`${image500}${item.poster_path}`}
                                        alt='Movie Poster'
                                        className='img-fluid rounded'
                                    />
                                </Link>
                            </div>
                        </div>
                    ))}
                </Slider>
            </section>
        </main>
    );
}
