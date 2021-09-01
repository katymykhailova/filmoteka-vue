<template>
  <loader :loading="reqStatus === 'pending'" />
  <section v-if="reqStatus === 'resolved'">
    <movie-scroller-list :movies="tranding">
      <template #trailerBtn="{ movie = {} }">
        <button-trailer :movie="movie" @click="trailer(movie)">
          <svg
            class="trailer-svg"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
          >
            <path
              d="M30.662 5.003c-4.488-0.645-9.448-1.003-14.662-1.003s-10.174 0.358-14.662 1.003c-0.86 3.366-1.338 7.086-1.338 10.997s0.477 7.63 1.338 10.997c4.489 0.645 9.448 1.003 14.662 1.003s10.174-0.358 14.662-1.003c0.86-3.366 1.338-7.086 1.338-10.997s-0.477-7.63-1.338-10.997zM12 22v-12l10 6-10 6z"
            ></path>
          </svg>
        </button-trailer>
      </template>

      <template #scrollCard="{ movie = {} }">
        <movie-scroller-card :movie="movie"></movie-scroller-card>
      </template>
    </movie-scroller-list>
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
  <teleport v-if="currentMovie" to="#modal">
    <modal :title="currentMovie.original_title" ref="trailerModal">
      <iframe
        width="560"
        height="315"
        :src="'https://www.youtube.com/embed/' + idMoviesTrailer"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </modal>
  </teleport>
</template>

<script>
import Paginator from 'primevue/paginator';
import MovieList from '../components/MovieList.vue';
import MovieCard from '../components/MovieCard.vue';
import Loader from '../components/Loader.vue';
import MovieScrollerList from '../components/MovieScrollerList.vue';
import MovieScrollerCard from '../components/MovieScrollerCard.vue';
import ButtonTrailer from '../components/ButtonTrailer.vue';
import Modal from '../components/Modal.vue';
import {
  fetchNormalizer,
  fetchPopularMovies,
  fetchTrendingMovies,
  fetchTrailerMovie,
} from '../services/apiService';

export default {
  name: 'Home',
  components: {
    Paginator,
    MovieList,
    MovieCard,
    Loader,
    MovieScrollerList,
    MovieScrollerCard,
    ButtonTrailer,
    Modal,
  },

  data() {
    return {
      movies: [],
      tranding: [],
      rows: 20,
      totalRecords: 0,
      currentPage: 1,
      first: 0,
      reqStatus: 'idle',
      input: 1,
      currentMovie: null,
      idMoviesTrailer: null,
    };
  },

  props: {
    addMessage: { type: Function, required: true },
  },

  created: function () {
    const page = this.$route.query.page || 1;
    this.currentPage = page;
    this.first = (Number(page) - 1) * this.rows;
    this.fetchPopularMovies();
    this.fetchTrendingMovies();
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

    scrollTo() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },

    async trailer(movie) {
      try {
        this.currentMovie = movie;
        this.idMoviesTrailer = await fetchTrailerMovie(movie.id);
        if (this.idMoviesTrailer) {
          this.$refs.trailerModal.open();
        }
      } catch (error) {
        this.addMessage(error.message);
      }
    },

    async fetchTrendingMovies() {
      try {
        this.reqStatus = 'pending';
        const trandingMoviesData = await fetchTrendingMovies();
        const trandingMovies = await trandingMoviesData.results;
        this.tranding = await fetchNormalizer(trandingMovies);
        this.reqStatus = 'resolved';
      } catch (error) {
        this.reqStatus = 'rejected';
        this.addMessage(error);
      }
    },

    async fetchPopularMovies() {
      try {
        this.reqStatus = 'pending';
        const popularMoviesData = await fetchPopularMovies(this.currentPage);
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
      this.currentPage = page;
      this.first = (Number(page) - 1) * this.rows;
      this.fetchPopularMovies();
      this.scrollTo();
    },
  },
};
</script>
