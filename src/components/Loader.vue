<template>
  <beat-loader :loading="loading" color="#343a40" />
</template>
<script>
import BeatLoader from 'vue-spinner/src/BeatLoader.vue';

export default {
  name: 'Loader',
  components: {
    BeatLoader,
  },
  props: { loading: { type: Boolean, required: true, default: false } },
};
</script>

<style>
.v-spinner {
  position: absolute;
  top: 75px;
  left: 50%;
}
</style>
