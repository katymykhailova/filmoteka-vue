<template>
  <transition name="toast">
    <div v-if="showToast" class="toast-container">
      <div class="toast">
        <slot></slot>
        <button class="toast-button" @click="onHandleClick">
          <svg
            aria-hidden="true"
            viewBox="0 0 14 16"
            class="toast-close-button"
          >
            <path
              fill-rule="evenodd"
              d="M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"
            ></path>
          </svg>
        </button>
      </div></div
  ></transition>
</template>

<script>
export default {
  name: 'ToastAlert',
  props: {
    showToast: { type: Boolean, required: true, default: false },
  },
  emits: ['handle-click'],
  methods: {
    onHandleClick() {
      this.$emit('close-toast');
    },
  },
};
</script>
