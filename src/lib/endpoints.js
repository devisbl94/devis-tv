const apiKey = 'f90ec6ca1b35404c3fe1890ef8aeffbf'
const base = 'https://api.themoviedb.org/3'

export const getPopular = async type => {
    return fetch(`${base}/${type}/popular?api_key=${apiKey}`)
}

export const getTrending = async type => {
    return fetch(`${base}/trending/${type}/day?api_key=${apiKey}`)
}

export const getTopRated = async type => {
    return fetch(`${base}/${type}/top_rated?api_key=${apiKey}`)
}

export const getAnimatedMovies = async type => {
    return fetch(
        `${base}/discover/${type}/?api_key=${apiKey}&sort_by=popularity.desc&include_adult=false&page=1&with_genres=16`
    )
}

export const getUpcomingMovieReleases = async () => {
    return fetch(`${base}/movie/upcoming?api_key=${apiKey}`)
}

export const getShowsAiring = async () => {
    return fetch(`${base}/tv/airing_today?api_key=${apiKey}`)
}

export const getDocumentaries = async type => {
    return fetch(
        `${base}/discover/${type}/?api_key=${apiKey}&sort_by=popularity.desc&include_adult=false&page=1&with_genres=99`
    )
}
