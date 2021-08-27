<template>
  <loader :loading="reqStatus === 'pending'" />
  <template v-if="showMovies">
    <section>
      <search-form v-model:searchText="searchQuery" @handle-submit="onSeach" />
      <movie-list :movies="movies">
        <template #movie="{ movie = {} }">
          <movie-card :movie="movie" />
        </template>
      </movie-list>
    </section>
    <paginator
      v-if="movies.length > 19"
      v-model:first="first"
      :rows="rows"
      :totalRecords="totalRecords"
      :currentPage="currentPage"
      @page="onPage($event)"
  /></template>
  <router-view :addMessage="addMessage"></router-view>
</template>

<script>
import Paginator from 'primevue/paginator';
import MovieList from '../components/MovieList.vue';
import MovieCard from '../components/MovieCard.vue';
import SearchForm from '../components/SearchForm.vue';
import Loader from '../components/Loader.vue';

import {
  fetchMoviesSearchQuery,
  fetchNormalizer,
} from '../services/apiService';

export default {
  name: 'Movies',
  components: {
    Paginator,
    MovieList,
    MovieCard,
    SearchForm,
    Loader,
  },

  data() {
    return {
      searchQuery: '',
      movies: [],
      rows: 20,
      totalRecords: 0,
      currentPage: 1,
      first: 0,
      reqStatus: 'idle',
    };
  },

  props: {
    addMessage: { type: Function, required: true },
  },

  created() {
    const search = this.$route.query.search || '';
    const page = this.$route.query.page || 1;
    this.searchQuery = search;
    this.currentPage = page;
    this.first = (Number(page) - 1) * this.rows;

    if (search) {
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
      this.$router.push({
        query: { page: event.page + 1, search: this.searchQuery },
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

    async fetchMoviesSearch() {
      if (!this.searchQuery) {
        return;
      }
      try {
        this.reqStatus = 'pending';
        const popularMoviesData = await fetchMoviesSearchQuery(
          this.searchQuery,
          this.currentPage,
        );
        const popularMovies = await popularMoviesData.results;
        this.movies = await fetchNormalizer(popularMovies);
        this.totalRecords = popularMoviesData.total_results;
        this.reqStatus = 'resolved';
      } catch (error) {
        this.reqStatus = 'rejected';
        this.addMessage(error.message);
      }
    },
  },

  watch: {
    $route(to) {
      const page = to.query.page || 1;
      const search = to.query.search;
      this.currentPage = page;
      this.first = (Number(page) - 1) * this.rows;
      if (search) {
        this.searchQuery = search;
      }
      this.fetchMoviesSearch();
      this.scrollTo();
    },
  },
};
</script>
