<template>
    <div :style="{ backgroundColor }">
        <h1>Películas Populares</h1>

        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-6" align="center" v-for="movie in popularMovies" :key="movie">
                    <div class="card posterCard">
                        <img class="poster" :src="'https://image.tmdb.org/t/p/w300' + movie.poster_path" />
                    </div>
                    <h6 class="title">{{ movie.title }}</h6>
                    <br>
                </div>
            </div>
        </div>
        <!--
        <ul>
            <li v-for="movie in popularMovies" :key="movie.id">
                <router-link :to="'/movie/' + movie.id">{{ movie.title }}</router-link>
            </li>
        </ul>
        -->
    </div>
</template>


<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'MovieList',
    setup() {
        const store = useStore();
        const popularMovies = computed(() => store.state.popularMovies);

        onMounted(() => {
            store.dispatch('fetchPopularMovies');
        });

        return {
            popularMovies,
            backgroundColor: '#8DA0BC'
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
    list-style-type: none;
    padding: 0;
}

li {
    margin-bottom: 5px;
}

a {
    color: #007bff;
    text-decoration: none;
    cursor: pointer;
}
</style>
  