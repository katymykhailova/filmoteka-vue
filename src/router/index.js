import { createWebHistory, createRouter } from 'vue-router';

// import Home from '../views/Home.vue';
// import Movies from '../views/Movies.vue';
// import Movie from '../views/Movie.vue';
// import Cast from '../views/Cast.vue';
// import Reviews from '../views/Reviews.vue';
// import Library from '../views/Library.vue';
const Home = () => import(/* webpackChunkName: "Home" */ '../views/Home.vue');
const Movies = () =>
  import(/* webpackChunkName: "Movies" */ '../views/Movies.vue');
const Movie = () =>
  import(/* webpackChunkName: "Movie" */ '../views/Movie.vue');
const Cast = () => import(/* webpackChunkName: "Cast" */ '../views/Cast.vue');
const Reviews = () =>
  import(/* webpackChunkName: "Reviews" */ '../views/Reviews.vue');
const Library = () =>
  import(/* webpackChunkName: "Library" */ '../views/Library.vue');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/movies',
    name: 'Movies',
    component: Movies,
    children: [
      {
        name: 'Movie',
        path: '/movies/:movieId',
        component: Movie,
        children: [
          {
            name: 'Cast',
            path: 'cast',
            component: Cast,
          },
          {
            name: 'Reviews',
            path: 'reviews',
            component: Reviews,
          },
        ],
      },
    ],
  },
  {
    path: '/library',
    name: 'Library',
    component: Library,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
