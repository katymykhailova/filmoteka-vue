<template>
  <nav class="nav">
    <router-link class="nav-link" :to="{ name: 'Home' }">Home</router-link>
    <router-link class="nav-link" :to="{ name: 'Movies' }">Movies</router-link>
    <router-link class="nav-link" :to="{ name: 'Library' }"
      >Library</router-link
    >
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
};
</script>
