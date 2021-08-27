<template>
  <div class="toast-container">
    <transition-group name="toast" tag="div">
      <div v-for="message in messages" :key="message.id" class="toast-item">
        {{ message.text }}
        <button
          class="toast-button"
          @click="
            {
              removeMessage(message);
            }
          "
        >
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
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'ToastMessages',
  props: {
    messages: { type: Array },
    removeMessage: { type: Function },
  },
};
</script>
