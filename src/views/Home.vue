<template>
  <section>
    <movie-list :movies="movies" @card-click="onMovieCardClick">
      <template #movie="{ movie = {} }">
        <movie-card :movie="movie" />
      </template>
    </movie-list>
  </section>
  <paginator
    v-if="movies.length > 19"
    v-model:first="first"
    :rows="20"
    :totalRecords="totalRecords"
    @page="onPage($event)"
  />
</template>

<script>
import Paginator from 'primevue/paginator';
import MovieList from '../components/MovieList.vue';
import MovieCard from '../components/MovieCard.vue';
import { fetchNormalizer, fetchTrendingMovies } from '../services/apiService';

export default {
  name: 'Home',
  components: {
    Paginator,
    MovieList,
    MovieCard,
  },
  data() {
    return {
      movies: [],
      toWatchArray: [],
      totalRecords: 0,
      currentPage: 1,
      first: 0,
    };
  },

  created: async function () {
    this.toWatchArray = JSON.parse(localStorage.getItem('WATCHED')) || [];
    const page = this.$route.query.page;
    if (page) {
      this.currentPage = page;
      this.fetchPopularMovies();
      return;
    }
    this.fetchPopularMovies();
  },

  methods: {
    onPage(event) {
      this.currentPage = event.page + 1;
      //event.page: New page number
      //event.first: Index of first record
      //event.rows: Number of rows to display in new page
      //event.pageCount: Total number of pages
    },

    onMovieCardClick(movie) {
      this.addWatched(movie);
    },

    addWatched(movie) {
      if (this.toWatchArray.some(({ id }) => id === movie.id)) {
        return;
      }
      this.toWatchArray = [...this.toWatchArray, movie];
    },

    async fetchPopularMovies() {
      try {
        const trendinMoviesData = await fetchTrendingMovies(this.currentPage);
        const trendinMovies = await trendinMoviesData.results;
        this.movies = await fetchNormalizer(trendinMovies);
        this.totalRecords = trendinMoviesData.total_results;
      } catch (error) {
        console.log('Что-то пошло не так');
      }
    },
  },

  watch: {
    currentPage() {
      this.$router.push({
        query: { page: this.currentPage },
      });
      this.fetchPopularMovies();
    },
    toWatchArray() {
      localStorage.setItem(`WATCHED`, JSON.stringify(this.toWatchArray));
    },
  },
};
</script>
