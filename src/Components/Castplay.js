import React from 'react';
import { image342, placeHolder } from '../Api/MoviesDB';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CastPlay({ cast = [], title = 'Cast' }) {
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
                {cast.length > 0 ? (
                    cast.map((person, index) => (
                        <div key={index} className='cast-card bg-gray-800 p-4 rounded-lg'>
                            <img
                                src={person.profile_path ? `${image342}${person.profile_path}` : `${placeHolder}`}  // Use a proper fallback for missing image
                                alt={person.name || 'Unknown Actor'}
                                className='w-full h-auto rounded-lg mb-4'
                            />
                            <div className='text-center'>
                                <p className='text-lg font-semibold'>{person.name || 'Unknown Actor'}</p>
                                <p className='text-sm text-gray-400'>{person.character || 'Character not available'}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='text-lg text-gray-400'>No cast available</p>
                )}

            </Slider>
        </div>
    );
}
