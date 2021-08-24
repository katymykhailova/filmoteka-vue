<template>
  <movie-details v-if="movie" :movie="movie" />
  <router-link :to="{ name: 'Cast' }" class="movie-details-link"
    >Cast
  </router-link>
  <router-link :to="{ name: 'Reviews' }" class="movie-details-link"
    >Reviews
  </router-link>
  <router-view></router-view>
</template>

<script>
import MovieDetails from '../components/MovieDetails.vue';
import { fetchMovieDetails } from '../services/apiService';

export default {
  name: 'Movie',
  components: {
    MovieDetails,
  },

  data() {
    return { movie: null };
  },

  created: async function () {
    this.movie = await fetchMovieDetails(this.$route.params.movieId);
  },
};
</script>
