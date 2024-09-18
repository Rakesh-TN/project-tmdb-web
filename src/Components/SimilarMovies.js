import React from 'react';
import { image342, placeHolder } from '../Api/MoviesDB';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

export default function SimilarMovies({ similarMovies = [], title = 'Similar Movies' }) {
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

    return (
        <div className='cast-section'>
            <h2 className='text-3xl font-bold mb-6'>{title}</h2>
            <Slider {...settings}>
                {similarMovies.length > 0 ? (
                    similarMovies.map((movie, index) => (
                        <Link to={`/movie/${movie.id}`}>
                            <div key={index} className='cast-card bg-gray-800 p-4 rounded-lg'>
                                <img
                                    src={movie.poster_path ? `${image342}${movie.poster_path}` : `${placeHolder}`}
                                    alt={movie.title || 'Unknown Movie'}
                                    className='w-full h-auto rounded-lg mb-4'
                                />
                                <p className='text-center text-lg font-semibold'>{movie.title || 'Unknown Movie'}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className='text-lg text-gray-400'>No similar movies available</p>
                )}
            </Slider>
        </div>
    );
}
