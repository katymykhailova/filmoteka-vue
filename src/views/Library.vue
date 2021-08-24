<template>
  <section>
    <search-form v-model:searchText="searchQuery" />
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
    v-if="toWatchArray.length > 19"
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
import SearchForm from '../components/SearchForm.vue';

export default {
  name: 'Library',
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

  created: function () {
    this.toWatchArray = JSON.parse(localStorage.getItem('WATCHED')) || [];
    this.totalRecords = this.toWatchArray.length;
    this.movies = this.toWatchArray;
  },

  methods: {
    onPage(event) {
      this.currentPage = event.page + 1;
    },

    onMovieCardClick(movie) {
      this.deleteWatched(movie);
    },

    deleteWatched(movie) {
      this.toWatchArray = this.toWatchArray.filter(({ id }) => id !== movie.id);
    },
  },

  watch: {
    currentPage() {
      const begin = (this.currentPage - 1) * 20;
      const end = (this.currentPage - 1) * 20 + 20;
      this.movies = this.toWatchArray.slice(begin, end);
    },

    toWatchArray() {
      localStorage.setItem(`WATCHED`, JSON.stringify(this.toWatchArray));
    },
  },
};
</script>
