<template>
  <div class="main-posts">
    <div v-for="post in feed" :key="post.pid">
      <PostComponent :title="post.title" :content="post.content" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import PostComponent from "@/components/posts/Post.vue";
import axios from "axios";

export default Vue.extend({
  components: {
    PostComponent,
  },
  name: "ThePosts",
  data() {
    return {
      feed: [],
    };
  },
  methods: {},
  async mounted() {
    try {
      const res = await axios.post("http://localhost:4000/graphql", {
        query: `
          query {
            feed {
              title
              content
              pid
            }
          }`
      })
      this.feed = res.data.data.feed;
    } catch (e) {
      console.log(e);
    }
  },
});
</script>

<style lang="scss" scoped>
</style>