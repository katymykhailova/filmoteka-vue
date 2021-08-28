<template>
  <movie-details v-if="movie" :movie="movie" />
  <template v-if="reqStatus === 'resolved'">
    <router-link :to="{ name: 'Cast' }" class="movie-details-link"
      >Cast
    </router-link>
    <router-link :to="{ name: 'Reviews' }" class="movie-details-link"
      >Reviews
    </router-link>
    <a @click.stop="onWatchedClick" class="movie-details-link">
      {{ addedMovie ? 'Remove from watched' : 'Add to watched' }}
    </a>
  </template>
  <router-view :addMessage="addMessage"></router-view>
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
      reqStatus: 'idle',
    };
  },

  props: {
    addMessage: { type: Function, required: true },
  },

  created: async function () {
    const movieId = this.$route.params.movieId;
    if (!movieId) {
      return;
    }
    try {
      this.reqStatus = 'pending';
      this.movie = await fetchMovieDetails(movieId);
      this.reqStatus = 'resolved';
      this.toWatchArray = JSON.parse(localStorage.getItem('WATCHED')) || [];
      this.addedMovie = this.toWatchArray.some(
        ({ id }) => id === this.movie.id,
      );
    } catch (error) {
      this.reqStatus = 'rejected';
      this.addMessage(error.message);
    }
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
