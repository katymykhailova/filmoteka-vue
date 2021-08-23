<template>
  <form class="search-form" @submit.prevent="onHandleSubmit">
    <button class="search-form-button" type="submit">
      <lable class="search-form-lable">Search</lable>
    </button>
    <label>
      <input
        class="search-form-input"
        :value="searchText"
        @input="$emit('update:searchText', $event.target.value)"
        type="text"
        name="searchQuery"
        autocomplete="off"
        autoFocus
        placeholder="Search images and photos"
    /></label>
  </form>
</template>
<script>
export default {
  name: 'SearchForm',
  props: {
    searchText: String,
  },
  emits: ['update:searchText', 'handle-submit'],
  methods: {
    onHandleSubmit() {
      this.$emit('handle-submit');
    },
  },
};
</script>
