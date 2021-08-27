<template>
  <app-bar>
    <template #nav>
      <navigation />
    </template>
  </app-bar>
  <toast-messages :messages="messages" :removeMessage="removeMessage" />
  <router-view :addMessage="addMessage"></router-view>
</template>

<script>
import { v4 as uuid } from 'uuid';
import AppBar from './components/AppBar.vue';
import Navigation from './components/Navigation.vue';
import ToastMessages from './components/ToastMessages.vue';

export default {
  name: 'App',
  components: {
    AppBar,
    Navigation,
    ToastMessages,
  },

  data() {
    return {
      messages: [],
    };
  },

  methods: {
    addMessage(message) {
      const currentMessege = {
        id: uuid(),
        text: message,
      };
      this.messages = [...this.messages, currentMessege];
      setTimeout(() => {
        this.removeMessage(currentMessege);
      }, 4000);
    },

    removeMessage(message) {
      this.messages = this.messages.filter(({ id }) => id !== message.id);
    },
  },
};
</script>

<style src="primevue/resources/themes/saga-blue/theme.css"></style>
<style src="primevue/resources/primevue.min.css"></style>
<style src="primeicons/primeicons.css"></style>
<style src="./main.css"></style>
