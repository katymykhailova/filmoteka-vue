<template>
  <reviews-movie v-if="reviews" :reviews="reviews" />
</template>

<script>
import ReviewsMovie from '../components/ReviewsMovie.vue';
import { fetchMovieReviews } from '../services/apiService';

export default {
  name: 'Reviews',
  components: {
    ReviewsMovie,
  },

  data() {
    return { reviews: [] };
  },

  created: async function () {
    const { results } = await fetchMovieReviews(this.$route.params.movieId);
    this.reviews = results;
  },
};
</script>
