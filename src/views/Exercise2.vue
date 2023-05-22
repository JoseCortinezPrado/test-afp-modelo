<template>
    <div :style="{ backgroundColor }">
        
        <h1>Películas mas populares</h1>

        <div class="container">

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

        onMounted(() => {
            store.dispatch('fetchPopularMovies');
        });

        const selectMovie = async (movieId) => {
            await store.dispatch('fetchMovieDetails', movieId);
            await store.dispatch('fetchMovieCast', movieId);
            showSelectedMovieDetails();
        };

        const showSelectedMovieDetails = () => {

            const selectedMovie = store.state.selectedMovie;
            const selectedMovieCast = store.state.movieCast;
            if (selectedMovie) {

                let ciclo = 7;

                if(selectedMovieCast.length < 7){
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
            backgroundColor: '#8DA0BC',
            selectMovie
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
    font-weight: 300;
}

h1 {
    font-size: 24px;
    margin-bottom: 10px;
}

ul {
    text-align: left;
}

a {
    color: #007bff;
    text-decoration: none;
    cursor: pointer;
}
</style>
  