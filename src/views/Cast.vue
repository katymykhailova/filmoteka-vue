<template>
  <cast-movie v-if="credits" :credits="credits" />
</template>

<script>
import CastMovie from '../components/CastMovie.vue';
import { fetchMovieCredits } from '../services/apiService';

export default {
  name: 'Cast',
  components: {
    CastMovie,
  },

  data() {
    return { credits: [] };
  },

  created: async function () {
    this.credits = await fetchMovieCredits(this.$route.params.movieId);
  },
};
</script>
