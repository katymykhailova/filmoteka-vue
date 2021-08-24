<template>
  <template v-if="showMovies">
    <section>
      <search-form v-model:searchText="searchQuery" @handle-submit="onSeach" />
      <movie-list
        :movies="movies"
        :searchQuery="searchQuery"
        @card-click="onMovieCardClick"
      >
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
  /></template>
  <router-view></router-view>
</template>

<script>
import Paginator from 'primevue/paginator';
import MovieList from '../components/MovieList.vue';
import MovieCard from '../components/MovieCard.vue';
import SearchForm from '../components/SearchForm.vue';

import {
  fetchMoviesSearchQuery,
  fetchNormalizer,
} from '../services/apiService';

// const page = new URLSearchParams(location.search).get('page') ?? 1;
// const query = new URLSearchParams(location.search).get('query') ?? '';

export default {
  name: 'Movies',
  components: {
    Paginator,
    MovieList,
    MovieCard,
    SearchForm,
  },
  data() {
    return {
      searchQuery: '',
      movies: [],
      toWatchArray: [],
      totalRecords: 0,
      currentPage: 1,
      first: 0,
    };
  },

  created: async function () {
    this.toWatchArray = JSON.parse(localStorage.getItem('WATCHED')) || [];
    const search = this.$route.query.search;
    if (search) {
      this.searchQuery = search;
      this.fetchMoviesSearch();
    }
  },

  computed: {
    showMovies() {
      return this.$route.params.movieId ? false : true;
    },
  },

  methods: {
    onPage(event) {
      this.currentPage = event.page + 1;
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

    onSeach() {
      this.fetchMoviesSearch();
    },

    async fetchMoviesSearch() {
      try {
        const popularMoviesData = await fetchMoviesSearchQuery(
          this.searchQuery,
          this.currentPage,
        );
        const popularMovies = await popularMoviesData.results;
        this.movies = await fetchNormalizer(popularMovies);
        this.totalRecords = popularMoviesData.total_results;
      } catch (error) {
        console.log('Что-то пошло не так');
      }
    },
  },

  watch: {
    currentPage() {
      this.$router.push({
        query: { page: this.currentPage, search: this.searchQuery },
      });
      this.fetchMoviesSearch();
    },

    searchQuery() {
      this.$router.push({ query: { page: '1', search: this.searchQuery } });
      this.first = 0;
    },

    toWatchArray() {
      localStorage.setItem(`WATCHED`, JSON.stringify(this.toWatchArray));
    },
  },
};
</script>
