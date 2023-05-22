import { createStore } from 'vuex';
import axios from 'axios';

const key = '34902d197f6651f29fd606622b6ec3dc';

export default createStore({
    //Store Ejercicio 1
    state() {
        return {
            tasks: [],
            popularMovies: [],
            selectedMovie: null,
            movieCast: [],
            movieSearch: []
        };
    },
    mutations: {
        addTask(state, task) {
            state.tasks.push(task);
        },
        completeTask(state, task) {
            task.completed = true;
        },
        deleteTask(state, task) {
            const index = state.tasks.indexOf(task);
            state.tasks.splice(index, 1);
        },
        setPopularMovies(state, movies) {
            state.popularMovies = movies;
        },
        setSelectedMovie(state, movie) {
            state.selectedMovie = movie;
        },
        setMovieCast(state, cast) {
            state.movieCast = cast
        },
        setMovieSearch(state, search){
            state.movieSearch = search;
        }
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
        async fetchMovieDetails({ commit }, movieId) {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                    params: {
                        api_key: key,
                        language: 'es-MX'
                    }
                });
                const movie = response.data;
                commit('setSelectedMovie', movie);
            } catch (error) {
                console.error(error)
            }
        },
        async fetchMovieCast({ commit }, movieId) {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
                    params: {
                        api_key: key
                    }
                });
                const movieCast = response.data.cast;
                commit('setMovieCast', movieCast);
            } catch (error) {
                console.error(error)
            }
        },
        async fetchSearchMovie({commit}, search){
            try {
                const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
                    params: {
                        api_key: key,
                        language: 'es-MX',
                        query: search
                    }
                });
                const movieSearch = response.data;
                commit('setMovieSearch', movieSearch)
            } catch (error){
                console.error(error)
            }
        }
    }
});


