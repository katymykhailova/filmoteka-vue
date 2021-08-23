<template>
  <nav class="nav">
    <a
      @click.prevent="onNavClick('home')"
      class="nav-link"
      :class="{ navactivelink: activelink === 'home' }"
    >
      Home
    </a>
    <a
      @click.prevent="onNavClick('movies')"
      class="nav-link"
      :class="{ navactivelink: activelink === 'movies' }"
    >
      Movies
    </a>
    <a
      @click.prevent="onNavClick('library')"
      class="nav-link"
      :class="{ navactivelink: activelink === 'library' }"
    >
      Library
    </a>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      activelink: 'home',
    };
  },
  emits: {
    'nav-click': value => typeof value === 'string',
  },

  methods: {
    onNavClick(view) {
      this.activelink = view;
      this.$emit('nav-click', this.activelink);
    },
  },
};
</script>
