<template>
  <section class="container">
    <cast-movie v-if="credits" :credits="credits" :reqStatus="reqStatus" />
  </section>
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
    return { credits: [], reqStatus: 'idle' };
  },

  props: {
    addMessage: { type: Function, required: true },
  },

  created: async function () {
    try {
      this.reqStatus = 'pending';
      this.credits = await fetchMovieCredits(this.$route.params.movieId);
      this.reqStatus = 'resolved';
    } catch (error) {
      this.reqStatus = 'rejected';
      this.addMessage(error.message);
    }
  },
};
</script>
