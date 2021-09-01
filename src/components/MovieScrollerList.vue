<template>
  <section class="movie-scroll-section">
    <ul class="movie-scroll-list">
      <li class="movie-scroll-item" v-for="movie in movies" :key="movie.id">
        <slot name="trailerBtn" :movie="movie"></slot>
        <slot name="scrollCard" :movie="movie"></slot>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'MovieScrollList',
  props: {
    movies: { type: Array, required: true },
  },
};
</script>
<style>
.movie-scroll-section {
  height: 200px;
  width: 100%;
  margin-bottom: 30px;
  overflow-x: scroll;
  overflow-y: hidden;
  scrollbar-color: #6969dd #e0e0e0;
}

.movie-scroll-section::-webkit-scrollbar {
  height: 7px;
}

.movie-scroll-section::-webkit-scrollbar-track {
  background-color: #e4e4e4;
  border-radius: 100px;
}

.movie-scroll-section::-webkit-scrollbar-thumb {
  width: 200px;
  background-color: #343a40;
  border-radius: 100px;
}

.movie-scroll-list {
  display: flex;
  padding: 0;
  margin: 0;
}
.movie-scroll-item {
  position: relative;
  list-style: none;
  width: 150px;
  height: 200px;
  object-fit: cover;
  padding: 0;
}
.movie-scroll-item:not(:last-child) {
  margin-right: 10px;
}
.movie-scroll-img {
  width: 150px;
  height: 100%;
  object-fit: cover;
}
</style>
