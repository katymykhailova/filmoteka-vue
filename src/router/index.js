import { createWebHistory, createRouter } from 'vue-router';
import Home from '../views/Home.vue';
import Movies from '../views/Movies.vue';
import Movie from '../views/Movie.vue';
import Cast from '../views/Cast.vue';
import Reviews from '../views/Reviews.vue';
import Library from '../views/Library.vue';

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
    props: true,
    children: [
      {
        name: 'Movie',
        path: '/:movieId',
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
  // {
  //   name: 'Movie',
  //   path: '/movies/:movieId',
  //   component: Movie,
  //   children: [
  //     {
  //       name: 'Cast',
  //       path: 'cast',
  //       component: Cast,
  //     },
  //     {
  //       name: 'Reviews',
  //       path: 'reviews',
  //       component: Reviews,
  //     },
  //   ],
  // },
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
