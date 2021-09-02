<template>
  <section class="movie-scroll-section">
    <!-- <transition-group name="tranding"> -->
    <transition-group name="tranding" tag="ul" class="movie-scroll-list">
      <li class="movie-scroll-item" v-for="movie in movies" :key="movie.id">
        <slot name="trailerBtn" :movie="movie"></slot>
        <slot name="scrollCard" :movie="movie"></slot>
      </li>
    </transition-group>
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
.trending-switch {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  width: 120px;
  height: 25px;
  padding: 5px;
  border: 1px solid #f59210;
  border-radius: 30px;
}

.box-switch {
  position: absolute;
  z-index: -1;
  top: -1px;
  box-sizing: border-box;
  content: '';
  height: 25px;
  padding: 5px;
  border: 1px solid #f59210;
  border-radius: 30px;
  background-color: #f59210;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.movie-scroll-title {
  align-items: baseline;
  display: flex;
}

.movie-scroll-link {
  display: inline-block;
  font-size: 12px;
  font-weight: bold;
}

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
  transition: transform 800ms cubic-bezier(0.4, 0, 0.2, 1);
}
.movie-scroll-item:not(:last-child) {
  margin-right: 10px;
}
.movie-scroll-item:hover {
  transform: scale(0.95);
}

.movie-scroll-img {
  width: 150px;
  height: 100%;
  object-fit: cover;
}

.tranding-enter-active,
.tranding-leave-active {
  transition: all 800ms cubic-bezier(0.4, 0, 0.2, 1);
}

.tranding-enter-from,
.tranding-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
