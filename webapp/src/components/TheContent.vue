<template>
  <b-container class="main-container">
    <b-row>
      <b-col sm="8">
        <ThePosts />
      </b-col>
      <b-col sm="4">
        <TheCategories />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Vue from "vue";
import ThePosts from "@/components/posts/ThePosts.vue";
import TheCategories from "@/components/categories/TheCategories.vue";

export default Vue.extend({
  components: {
    ThePosts,
    TheCategories,
  },
  name: "TheContent",
});
</script>

<style lang="scss" scoped>
.main-container {
  background-color: lightskyblue;
  margin-top: 20px;
}
</style>