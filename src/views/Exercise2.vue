<template>
    <div :style="{ backgroundColor }">

        <nav class="navbar bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" :href="'/'">Volver Atras</a>
            </div>
        </nav>

        <div class="container mt-4">
            <h2 class="h1">Buscar</h2>
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Buscar..." v-model="searchTerm"
                    @input="fetchResults()">
            </div>
            <ul class="list-group">
                <li class="list-group-item" v-for="(result, index) in searchResults" :key="index">
                    <div @click="selectMovie(result.id), clearScreen()">
                        {{ result.title }}
                    </div>
                    
                </li>
            </ul>
        </div>

        <div class="container">
            <div class="row">
                <h2 class="h1">Peliculas mas populares</h2>
            </div>
            <div class="row">
                <div class="col-lg-3 col-6" align="center" v-for="movie in popularMovies" :key="movie.id">
                    <div class="card posterCard" @click="selectMovie(movie.id)">
                        <img class="poster" :src="'https://image.tmdb.org/t/p/w300' + movie.poster_path" />
                    </div>
                    <h6 class="title">{{ movie.title }}</h6>
                    <br>
                </div>

            </div>
        </div>

    </div>
</template>


<script>
import Swal from 'sweetalert2';
import { computed, onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import 'sweetalert2/dist/sweetalert2.min.css';


export default {
    name: 'MovieList',
    setup() {
        const store = useStore();
        const popularMovies = computed(() => store.state.popularMovies);
        const searchTerm = ref('');
        const searchResults = ref([]);

        onMounted(() => {
            store.dispatch('fetchPopularMovies');
        });

        const selectMovie = async (movieId) => {
            await store.dispatch('fetchMovieDetails', movieId);
            await store.dispatch('fetchMovieCast', movieId);
            showSelectedMovieDetails();
        };

        const clearScreen = () => {
            searchResults.value = [];
        }

        const fetchResults = async () => {
            if (searchTerm.value.length < 3) {
                searchResults.value = [];
                return;
            }

            await store.dispatch('fetchSearchMovie', searchTerm.value);
            const search = store.state.movieSearch;

            searchResults.value = store.state.movieSearch.results.slice(0,10);


        }

        const showSelectedMovieDetails = () => {

            const selectedMovie = store.state.selectedMovie;
            const selectedMovieCast = store.state.movieCast;
            if (selectedMovie) {

                let ciclo = 7;

                if (selectedMovieCast.length < 7) {
                    ciclo = selectedMovieCast.length;
                }

                let elenco = '<ul>';

                for (let i = 0; i < ciclo; i++) {
                    elenco += `<li align="left">${selectedMovieCast[i].name}</li>`
                }

                elenco += '</ul>'

                Swal.fire({

                    title: selectedMovie.title,
                    imageUrl: `https://image.tmdb.org/t/p/w300${selectedMovie.poster_path}`,
                    html: '<b>Fecha de Lanzamiento: </b>' + new Date(selectedMovie.release_date + ' 12:00:00').toLocaleDateString() + '<br><br>' +
                        '<b>Sinopsis:</b> ' + selectedMovie.overview + '<br><br>' +
                        '<b>Actores Principales: </b> <br>' + elenco
                });
            }


        };

        return {
            popularMovies,
            backgroundColor: '#080F28',
            selectMovie,
            searchTerm,
            searchResults,
            fetchResults,
            clearScreen
        };


    },


};
</script>
  
<style scoped>
.posterCard {
    width: 200px;
    height: 300px;
    overflow: hidden;
    align-items: center;
}

.poster {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.title {
    text-align: center;
    font-weight: 500;
    color: white;
    font-family: Arial, Helvetica, sans-serif;

}

.h1 {
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 500;
}

ul {
    text-align: left;
}

a {
    color: #007bff;
    text-decoration: none;
    cursor: pointer;
}

.navbar-brand{
    color: white;
}

.navbar-brand:hover,
.navbar-brand:active{
    color: white;
}
</style>
  