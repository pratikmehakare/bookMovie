const BASE_URL = process.env.REACT_APP_BASE_URL 

export const authEndpoints = {
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login"
}

export const userEndpoints = {
    GET_USER_API: BASE_URL + "/user/getUser",
    GET_ALLMOVIES_API: BASE_URL + "/user/getAllMovies" ,
    GET_MOVIE_BY_ID_API:BASE_URL + '/user/getMovieById',

    BOOK_MOVIE_API: BASE_URL + "/user/book"
}

export const adminEndpoints = {
    ADD_MOVIE_API: BASE_URL + "/admin/addMovie",
    DELETE_MOVIE_API: BASE_URL + "/admin/delete",
    EDIT_MOVIE_API: BASE_URL + "/admin/edit",
    GET_MOVIE_API: BASE_URL + "/admin/getMovies"
}