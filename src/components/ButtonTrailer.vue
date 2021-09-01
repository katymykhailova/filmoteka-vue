<template>
  <button class="button-trailer" @click="handleBtnClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'ButtonTrailer',
  props: {
    movie: { type: Object, required: true },
  },

  emits: ['trailer-click'],
  methods: {
    handleBtnClick() {
      this.$emit('trailer-click');
    },
  },
};
</script>

<style>
.button-trailer {
  position: absolute;
  top: 10px;
  left: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0;
  margin: 0;
  /* width: 40px;
  height: 40px; */
  /* background-color: #deb887; */
  background: transparent;
  border: 0;
  /* border-radius: 50%; */
}
</style>
