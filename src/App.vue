<template>
  <app-bar>
    <template #nav>
      <!-- <navigation @nav-click="changeView" /> -->
      <navigation />
    </template>
  </app-bar>

  <!-- <section>
    <search-form
      v-if="view === 'movies' || view === 'library'"
      v-model:searchText="searchQuery"
      @handle-submit="onSeach"
    />
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
  /> -->
  <router-view></router-view>
</template>

<script>
import AppBar from './components/AppBar.vue';
import Navigation from './components/Navigation.vue';
// import Paginator from 'primevue/paginator';
// import MovieList from './components/MovieList.vue';
// import MovieCard from './components/MovieCard.vue';
// import SearchForm from './components/SearchForm.vue';

// import {
//   fetchMoviesSearchQuery,
//   fetchNormalizer,
//   fetchTrendingMovies,
// } from './services/apiService';

export default {
  name: 'App',
  components: {
    AppBar,
    Navigation,
    // Paginator,
    // MovieList,
    // MovieCard,
    // SearchForm,
  },
  //   data() {
  //     return {
  //       searchQuery: '',
  //       movies: [],
  //       toWatchArray: [],
  //       totalRecords: 0,
  //       currentPage: 1,
  //       first: 0,
  //       view: 'home',
  //     };
  //   },

  //   created: async function () {
  //     this.fetchPopularMovies(0);
  //     this.toWatchArray = JSON.parse(localStorage.getItem('WATCHED')) || [];
  //   },

  //   computed: {
  //     filteredMovies() {
  //       return this.movies.filter(({ title }) =>
  //         title.toLowerCase().includes(this.searchQuery.toLowerCase()),
  //       );
  //     },
  //   },

  //   methods: {
  //     changeView(view) {
  //       this.view = view;
  //     },

  //     onPage(event) {
  //       this.currentPage = event.page + 1;
  //       //event.page: New page number
  //       //event.first: Index of first record
  //       //event.rows: Number of rows to display in new page
  //       //event.pageCount: Total number of pages
  //     },

  //     onMovieCardClick(movie) {
  //       if (this.view === 'library') {
  //         this.deleteWatched(movie);
  //       } else {
  //         this.addWatched(movie);
  //       }
  //     },

  //     addWatched(movie) {
  //       if (this.toWatchArray.some(({ id }) => id === movie.id)) {
  //         return;
  //       }
  //       this.toWatchArray = [...this.toWatchArray, movie];
  //     },

  //     deleteWatched(movie) {
  //       this.toWatchArray = this.toWatchArray.filter(({ id }) => id !== movie.id);
  //     },

  //     onSeach() {
  //       if (this.view === 'movies') {
  //         this.fetchMoviesSearch();
  //       }
  //     },

  //     async fetchPopularMovies() {
  //       try {
  //         const trendinMoviesData = await fetchTrendingMovies(this.currentPage);
  //         const trendinMovies = await trendinMoviesData.results;
  //         this.movies = await fetchNormalizer(trendinMovies);
  //         this.totalRecords = trendinMoviesData.total_results;
  //       } catch (error) {
  //         console.log('Что-то пошло не так');
  //       }
  //     },

  //     async fetchMoviesSearch() {
  //       try {
  //         const popularMoviesData = await fetchMoviesSearchQuery(
  //           this.searchQuery,
  //           this.currentPage,
  //         );
  //         const popularMovies = await popularMoviesData.results;
  //         this.movies = await fetchNormalizer(popularMovies);
  //         this.totalRecords = popularMoviesData.total_results;
  //       } catch (error) {
  //         console.log('Что-то пошло не так');
  //       }
  //     },
  //   },

  //   watch: {
  //     view() {
  //       this.searchQuery = '';
  //       this.first = 0;
  //       switch (this.view) {
  //         case 'home':
  //           this.fetchPopularMovies();
  //           break;
  //         case 'movies':
  //           this.movies = [];
  //           break;
  //         case 'library':
  //           this.movies = this.toWatchArray;
  //           this.totalRecords = this.toWatchArray.length;
  //           break;

  //         default:
  //           this.fetchPopularMovies();
  //       }
  //     },

  //     currentPage() {
  //       if (this.view == 'movies') {
  //         this.fetchMoviesSearch();
  //       } else {
  //         this.fetchPopularMovies();
  //       }
  //     },

  //     toWatchArray() {
  //       localStorage.setItem(`WATCHED`, JSON.stringify(this.toWatchArray));
  //       if (this.view === 'library') {
  //         this.movies = this.toWatchArray;
  //       }
  //     },

  //     searchQuery() {
  //       this.first = 0;
  //     },
  //   },
};
</script>

<style src="primevue/resources/themes/saga-blue/theme.css"></style>
<style src="primevue/resources/primevue.min.css"></style>
<style src="primeicons/primeicons.css"></style>
<style src="./main.css"></style>
