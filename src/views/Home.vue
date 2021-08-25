<template>
  <loader :loading="reqStatus === 'pending'" />
  <section>
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
  />
</template>

<script>
import Paginator from 'primevue/paginator';
import MovieList from '../components/MovieList.vue';
import MovieCard from '../components/MovieCard.vue';
import Loader from '../components/Loader.vue';
import { fetchNormalizer, fetchTrendingMovies } from '../services/apiService';

export default {
  name: 'Home',
  components: {
    Paginator,
    MovieList,
    MovieCard,
    Loader,
  },
  data() {
    return {
      movies: [],
      rows: 20,
      totalRecords: 0,
      currentPage: 1,
      first: 0,
      reqStatus: 'idle',
    };
  },

  created: function () {
    const page = this.$route.query.page || 1;
    this.currentPage = page;
    this.first = (Number(page) - 1) * this.rows;
    this.fetchPopularMovies();
  },

  methods: {
    onPage(event) {
      this.$router.push({
        query: { page: event.page + 1 },
      });
      //event.page: New page number
      //event.first: Index of first record
      //event.rows: Number of rows to display in new page
      //event.pageCount: Total number of pages
    },

    async fetchPopularMovies() {
      try {
        this.reqStatus = 'pending';
        const trendinMoviesData = await fetchTrendingMovies(this.currentPage);
        const trendinMovies = await trendinMoviesData.results;
        this.movies = await fetchNormalizer(trendinMovies);
        this.totalRecords = trendinMoviesData.total_results;
        this.reqStatus = 'resolved';
      } catch (error) {
        this.reqStatus = 'rejected';
        console.log('Что-то пошло не так');
      }
    },
  },

  watch: {
    $route(to) {
      const page = to.query.page || 1;
      this.currentPage = page;
      this.first = (Number(page) - 1) * this.rows;
      this.fetchPopularMovies();
    },
  },
};
</script>
