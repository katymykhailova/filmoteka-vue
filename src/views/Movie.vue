<template>
  <movie-details v-if="movie" :movie="movie" />
  <router-link :to="{ name: 'Cast' }" class="movie-details-link"
    >Cast
  </router-link>
  <router-link :to="{ name: 'Reviews' }" class="movie-details-link"
    >Reviews
  </router-link>
  <a @click.stop="onWatchedClick" class="movie-details-link">
    {{ addedMovie ? 'Remove from watched' : 'Add to watched' }}
  </a>
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
    return {
      movie: null,
      toWatchArray: [],
      addedMovie: false,
    };
  },

  created: async function () {
    this.movie = await fetchMovieDetails(this.$route.params.movieId);
    this.toWatchArray = JSON.parse(localStorage.getItem('WATCHED')) || [];
    this.addedMovie = this.toWatchArray.some(({ id }) => id === this.movie.id);
  },

  methods: {
    onWatchedClick() {
      if (this.addedMovie) {
        this.deleteWatched();
        this.addedMovie = false;
      } else {
        this.addWatched();
        this.addedMovie = true;
      }
    },
    addWatched() {
      if (this.addedMovie) {
        return;
      }
      this.toWatchArray = [...this.toWatchArray, this.movie];
      this.addedMovie = true;
    },
    deleteWatched() {
      this.toWatchArray = this.toWatchArray.filter(
        ({ id }) => id !== this.movie.id,
      );
    },
  },
  watch: {
    toWatchArray() {
      localStorage.setItem(`WATCHED`, JSON.stringify(this.toWatchArray));
    },
  },
};
</script>
