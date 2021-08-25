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
    // searchQuery: { type: String, required: false, default: '' },
  },
  // computed: {
  //   filteredMovies() {
  //     return this.movies.filter(({ title }) =>
  //       title.toLowerCase().includes(this.searchQuery.toLowerCase()),
  //     );
  //   },
  // },
  // emits: {
  //   'card-click': value => typeof value === 'object',
  // },
};
</script>
