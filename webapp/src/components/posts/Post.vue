<template>
  <div class="post">
      <h2 class="title">{{ title }}</h2>
      <p> {{ content }}</p>
      <a href="">Read More</a>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
    name: 'Post',
    props: {
        title: String,
        content: String,
        pid: Number,
    }
});
</script>

<style lang="scss" scoped>
.post {
    text-align: left;
    margin: 20px 20px;
    background-color: gray;
    padding: 2rem;
}
</style>