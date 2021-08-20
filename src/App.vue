<template>
  <header class="header">
    <nav class="nav">
      <a class="nav-link nav-activelink"> Home </a>
      <a class="nav-link"> Movies </a>
    </nav>
  </header>
  <section>
    <form class="search-form" @submit.prevent="fetchMovies">
      <button class="search-form-button" type="submit">
        <lable class="search-form-lable">Search</lable>
      </button>
      <input
        class="search-form-input"
        v-model="searchQuery"
        type="text"
        name="searchQuery"
        autocomplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </form>
    <ul class="movie-list">
      <li class="movie-item" v-for="m in movies" :key="m.id">
        <img class="movie-img" :src="m.poster_path" :alt="m.title" />
        <h3 class="movie-title">{{ m.title }}</h3>
        <p class="movie-text">{{ m.genres.join(", ") }}</p>
        <p>
          {{ m.release_date }} | <span>{{ m.vote_average }}</span>
        </p>
      </li>
    </ul>
  </section>
  <HelloWorld />
  <!-- <paginate
    :page-count="20"
    :click-handler="functionName"
    :prev-text="'Prev'"
    :next-text="'Next'"
    :container-class="'className'"
  >
  </paginate> -->
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
// import Paginate from "vuejs-paginate";
import {
  fetchMoviesSearchQuery,
  fetchNormalizer,
  fetchTrendingMovies,
} from "./services/apiService";

export default {
  name: "App",
  components: {
    HelloWorld,
    // paginate: Paginate,
  },
  data() {
    return {
      searchQuery: "",
      movies: [],
      perPage: 5,
      currentPage: 1,
      rows: 0,
    };
  },
  created: async function () {
    try {
      const trendinMoviesData = await fetchTrendingMovies(1);
      const trendinMovies = await trendinMoviesData.results;
      this.movies = await fetchNormalizer(trendinMovies);
      this.rows = trendinMovies.total_pages;
    } catch (error) {
      console.log("Что-то пошло не так");
    }
  },
  methods: {
    addContact() {
      const { name, number } = this;
      const newContact = {
        id: name,
        name,
        number,
      };
      this.contacts.push(newContact);
    },
    handleDeleteContact(contacToRemove) {
      console.log(contacToRemove);
      this.contacts = this.contacts.filter(
        (contact) => contact !== contacToRemove
      );
    },
    async fetchMovies() {
      try {
        const popularMoviesData = await fetchMoviesSearchQuery(
          this.searchQuery,
          1
        );
        const popularMovies = await popularMoviesData.results;
        this.movies = await fetchNormalizer(popularMovies);
        this.rows = popularMoviesData.total_pages;
      } catch (error) {
        console.log("Что-то пошло не так");
      }
    },
  },
};
</script>

<style>
.header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  top: 0;
  left: 0;
  position: sticky;
  z-index: 1100;
  min-height: 64px;
  padding-right: 24px;
  padding-left: 24px;
  padding-top: 12px;
  padding-bottom: 12px;
  margin-bottom: 30px;
  color: #fff;
  background-color: #343a40;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}
.nav-link {
  padding: 5px;
  text-decoration: none;
  font-size: 24px;
  color: rgba(255, 255, 255, 0.5);
}
.nav-activelink {
  color: #ffffff;
}
.search-form {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 30px;
  //max-width: 600px;
  background-color: #fff;
  border-radius: 3px;
  overflow: hidden;
}
.search-form-button {
  display: inline-block;
  width: 48px;
  height: 48px;
  border: 0;
  background-color: rgba(0, 0, 0, 0.08);
  background-image: url("https://image.flaticon.com/icons/svg/149/149852.svg");
  background-size: 40%;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.6;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  outline: none;
}
.search-form-button:hover {
  opacity: 1;
}
.search-form-lable {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  clip-path: inset(50%);
  border: 0;
}
.search-form-input {
  display: inline-block;
  width: 600px;
  height: 46px;
  font: inherit;
  font-size: 20px;
  border: rgba(0, 0, 0, 0.08) solid 1px;
  outline: none;
  padding-left: 4px;
  padding-right: 4px;
}
.search-form-input::placeholder {
  font: inherit;
  font-size: 18px;
}
.movie-list {
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
}
.movie-item {
  border-radius: 2px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
}
.movie-item:hover {
  transform: scale(1.03);
  cursor: zoom-in;
}

.movie-img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.movie-title {
  margin: 0;
  padding: 5px;
  font-size: 12px;
  line-height: 1.33;
  text-transform: uppercase;
}

.movie-text {
  margin: 0;
  padding: 0 5px 5px;
  font-size: 12px;
  line-height: 1.33;
}
</style>
