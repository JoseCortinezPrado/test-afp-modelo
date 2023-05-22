import { createStore } from 'vuex';
import axios from 'axios';

const key = '34902d197f6651f29fd606622b6ec3dc';

export default createStore({

    state() {
        return {
            popularMovies: [],
            selectedMovie: null,
        };
    },
    mutations: {
        setPopularMovies(state, movies) {
            state.popularMovies = movies;
        },
        setSelectedMovie(state, movie) {
            state.selectedMovie = movie;
        },
    },
    actions: {
        fetchPopularMovies({ commit }) {
            axios
                .get('https://api.themoviedb.org/3/movie/popular', {
                    params: {
                        api_key: key,
                        language: 'es-MX'
                    },
                })
                .then((response) => {
                    const movies = response.data.results;
                    commit('setPopularMovies', movies);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        fetchMovieDetails({ commit }, movieId) {
            axios
                .get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                    params: {
                        api_key: key,
                    },
                })
                .then((response) => {
                    const movie = response.data;
                    commit('setSelectedMovie', movie);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
});

