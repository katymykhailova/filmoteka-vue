<template>
  <img
    class="movie-scroll-img"
    :src="movie.poster_path"
    :alt="movie.original_title"
  />
</template>
<script>
export default {
  name: 'MovieScrollerCard',
  props: {
    movie: { type: Object, required: true },
  },
};
</script>
