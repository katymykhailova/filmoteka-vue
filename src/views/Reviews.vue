<template>
  <reviews-movie v-if="reviews" :reviews="reviews" :reqStatus="reqStatus" />
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
    return { reviews: [], reqStatus: 'idle' };
  },

  props: {
    addMessage: { type: Function, required: true },
  },

  created: async function () {
    try {
      this.reqStatus = 'pending';
      const { results } = await fetchMovieReviews(this.$route.params.movieId);
      this.reviews = results;
      this.reqStatus = 'resolved';
    } catch (error) {
      this.reqStatus = 'rejected';
      this.addMessage(error.message);
    }
  },
};
</script>
