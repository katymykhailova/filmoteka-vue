<template>
  <ul class="peviews-list">
    <li v-for="review in reviews" class="reviews-item" :key="review.id">
      <h3 class="reviews-title">{{ review.author }}</h3>
      <p class="reviews-content">{{ review.content }}</p>
    </li>
  </ul>

  <!-- <p class="reviews-error">We don't have any reviews for this movie</p> -->
</template>
<script>
export default {
  name: 'Reviews',
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
};
</script>
