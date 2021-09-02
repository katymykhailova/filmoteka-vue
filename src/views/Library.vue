<template>
  <section class="container">
    <search-form v-model:searchText="searchQuery" @handle-submit="onSeach" />
    <movie-list :movies="filteredMovies">
      <template #movie="{ movie = {} }">
        <movie-card :movie="movie" />
      </template>
    </movie-list>
  </section>
  <section class="container">
    <paginator
      v-if="movies.length >= rows"
      v-model:first="first"
      :rows="rows"
      :totalRecords="totalRecords"
      :currentPage="currentPage"
      @page="onPage($event)"
    />
  </section>
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
      rows: 20,
      totalRecords: 0,
      currentPage: 1,
      first: 0,
    };
  },

  props: {
    addMessage: { type: Function, required: true },
  },

  created: function () {
    this.toWatchArray = JSON.parse(localStorage.getItem('WATCHED')) || [];
    this.totalRecords = this.toWatchArray.length;
    this.setMovies();
  },

  methods: {
    onPage(event) {
      const query = this.searchQuery
        ? { page: event.page + 1, search: this.searchQuery }
        : { page: event.page + 1 };
      this.$router.push({
        query,
      });
    },

    scrollTo() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },

    onSeach() {
      this.$router.push({ query: { page: '1', search: this.searchQuery } });
      this.first = 0;
    },

    setMovies() {
      this.movies = this.toWatchArray.filter(({ title }) =>
        title.toLowerCase().includes(this.searchQuery.toLowerCase()),
      );
    },
  },

  computed: {
    filteredMovies() {
      const begin = (this.currentPage - 1) * this.rows;
      const end = (this.currentPage - 1) * this.rows + this.rows;
      return this.movies.slice(begin, end);
    },
  },

  watch: {
    $route(to) {
      const page = to.query.page || 1;
      const search = to.query.search || '';
      this.searchQuery = search;
      this.currentPage = page;
      this.first = (Number(page) - 1) * this.rows;
      this.setMovies();
      this.scrollTo();
    },
  },
};
</script>
