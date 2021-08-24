<template>
  <router-link
    :to="{ name: 'Movie', params: { movieId: movie.id } }"
    class="movie-link"
  >
    <img class="movie-img" :src="movie.poster_path" :alt="movie.title" />
    <h3 class="movie-title">{{ movie.title }}</h3>
    <p class="movie-text">{{ movie.genres.join(', ') }}</p>
    <p class="movie-text">
      {{ movie.release_date }} | <span>{{ movie.vote_average }}</span>
    </p>
  </router-link>
</template>
<script>
export default {
  name: 'MovieCard',
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
};
</script>
