<template>
  <div class="section-movie">
    <slot name="trailerBtn"></slot>
    <img
      class="movie-details-img"
      :src="movie.poster_path"
      :alt="movie.original_title"
    />
    <div class="movie-info">
      <h2 class="movie-details-title">{{ movie.original_title }}</h2>

      <ul class="movie-info-list">
        <li class="movie-info-item">
          <p class="movie-info-text">Vote/Votes</p>
          <span>{{ movie.vote_average }}</span>
          <span>/</span>
          <span>{{ movie.vote_count }}</span>
        </li>
        <li class="movie-info-item">
          <p class="movie-info-text">Popularity</p>
          <span>{{ movie.popularity }}</span>
        </li>
        <li class="movie-info-item">
          <p class="movie-info-text">Original title</p>
          <span>{{ movie.original_title }}</span>
        </li>
        <li class="movie-info-item">
          <p class="movie-info-text">Genre</p>
          {{ movie.genres.map(genre => genre.name).join(', ') }}
        </li>
      </ul>

      <div class="movie-about">
        <h3 class="movie-about-title">About</h3>
        <p class="movie-about-text">{{ movie.overview }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Movie',
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
};
</script>
