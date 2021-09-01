<template>
  <router-link :to="{ name: 'Movie', params: { movieId: movie.id } }">
    <img
      class="movie-scroll-img"
      :src="movie.poster_path"
      :alt="movie.original_title"
    />
  </router-link>
</template>
<script>
export default {
  name: 'MovieScrollerCard',
  props: {
    movie: { type: Object, required: true },
  },
};
</script>
