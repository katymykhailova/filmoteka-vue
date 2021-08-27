<template>
  <ul class="credits-list">
    <li v-for="credit in credits" class="credits-item" :key="credit.id">
      <img
        class="credits-img"
        :src="credit.profile_path"
        :alt="credit.original_name"
      />
      <span>{{ credit.original_name }}</span>
    </li>
  </ul>
  <p v-if="reqStatus === 'rejected'" class="credits-error">
    We don't have any credits for this movie
  </p>
</template>
<script>
export default {
  name: 'Cast',
  props: {
    credits: {
      type: Array,
      required: true,
    },
    reqStatus: {
      type: String,
      required: true,
      default: 'idle',
    },
  },
};
</script>
