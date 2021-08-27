<template>
  <ul class="movie-list">
    <li class="movie-item" v-for="movie in movies" :key="movie.id">
      <slot name="movie" :movie="movie"> </slot>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'MovieList',
  props: {
    movies: { type: Array, required: true },
  },
};
</script>
