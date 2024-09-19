import React from 'react';
import { image342, placeHolder } from '../Api/MoviesDB';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';


export default function MovieCard({ title, movies }) {
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
        <div>
            <h2 className='text-4xl font-bold text-white'>{title}</h2>
            <Slider {...settings}>
                {movies && movies.length > 0 &&
                    movies.map((movie, index) => (
                        <Link to={`/movie/${movie.id}`}>
                        <div key={index} className='bg-gray-900 p-4 rounded-lg'>
                            <img
                                src={movie.poster_path ? `${image342}${movie.poster_path}` : `${placeHolder}`} // Fixed field name
                                alt={movie.title}
                                className='w-full h-auto rounded-lg mb-4'
                            />
                        </div>
                        </Link>
                    ))
                }
            </Slider>
        </div>
    )
}
