import axios from "axios";

const apiBaseUrl = 'https://api.themoviedb.org/3'
const apiKey = '4822a8c82293bca5cb009c053d5f7a69';

const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`

const movieDetailsEndpoint = id  => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`
const movieCreditsEndpoint = id  => `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`
const movieSimilarMoviesEndpoint = id  => `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`

const personDetailsEndpoint = id  => `${apiBaseUrl}/person/${id}/?api_key=${apiKey}`
const personMoviesEndpoint = id  => `${apiBaseUrl}/person/${id}movie_credits/?api_key=${apiKey}`

export const image500 = `https://image.tmdb.org/t/p/w500`;
export const image342 = `https://image.tmdb.org/t/p/w342`;
export const image185 = `https://image.tmdb.org/t/p/w185`;

export const placeHolder = `https://th.bing.com/th/id/OIP.BkoXurD30qD41Q4pDKvDAAHaGH?rs=1&pid=ImgDetMain`;

const apiCall = async (endpoint, param) => {
    const options ={ 
        method : 'GET',
        url : endpoint,
        param : param? param: {}
    }
    try{
        const response = await axios.request(options)
        return response.data;
    }
    catch (error){
        console.log('error: ', error.response.data);
        return{}
    }
}

export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoint)
}
export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndpoint)
}
export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoint)
}

export const fetchMoviesDetails = id => {
    return apiCall(movieDetailsEndpoint(id))
}
export const fetchMoviesCredits  = id => {
    return apiCall(movieCreditsEndpoint(id))
}
export const fetchSimilarMoviesDetails = id => {
    return apiCall(movieSimilarMoviesEndpoint(id))
}

export const fetchPersonDetails = id => {
    return apiCall(personDetailsEndpoint(id))
}
export const fetchPersonMovies = id => {
    return apiCall(personMoviesEndpoint(id))
}