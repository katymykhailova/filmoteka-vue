<template>
  <section>
    <search-form v-model:searchText="searchQuery" />
    <movie-list :movies="filteredMovies">
      <template #movie="{ movie = {} }">
        <movie-card :movie="movie" />
      </template>
    </movie-list>
  </section>
  <paginator
    v-if="toWatchArray.length > 19"
    v-model:first="first"
    :rows="rows"
    :totalRecords="totalRecords"
    :currentPage="currentPage"
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
      rows: 20,
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
  },

  computed: {
    filteredMovies() {
      return this.movies.filter(({ title }) =>
        title.toLowerCase().includes(this.searchQuery.toLowerCase()),
      );
    },
  },

  watch: {
    currentPage() {
      const begin = (this.currentPage - 1) * this.rows;
      const end = (this.currentPage - 1) * this.rows + this.rows;
      this.movies = this.toWatchArray.slice(begin, end);
      this.$router.push({
        query: { page: this.currentPage },
      });
    },

    toWatchArray() {
      localStorage.setItem(`WATCHED`, JSON.stringify(this.toWatchArray));
    },

    $route(to) {
      const page = to.query.page;
      if (page) {
        this.currentPage = page;
        this.first = (Number(to.query.page) - 1) * this.rows;
      }
    },
  },
};
</script>
