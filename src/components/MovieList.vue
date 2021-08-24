<template>
  <ul class="movie-list">
    <li
      @click="onCardClick(movie)"
      class="movie-item"
      v-for="movie in filteredMovies"
      :key="movie.id"
    >
      <slot name="movie" :movie="movie"> </slot>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'MovieList',
  props: {
    movies: { type: Array, required: true },
    searchQuery: { type: String, required: false, default: '' },
  },
  computed: {
    filteredMovies() {
      return this.movies.filter(({ title }) =>
        title.toLowerCase().includes(this.searchQuery.toLowerCase()),
      );
    },
  },
  emits: {
    'card-click': value => typeof value === 'object',
  },

  methods: {
    onCardClick(movie) {
      this.$emit('card-click', movie);
    },
  },
};
</script>
