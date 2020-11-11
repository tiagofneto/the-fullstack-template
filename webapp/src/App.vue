<template>
  <div id="app">
    <TheNavBar/>
    <TheContent/>
  </div>
</template>

<script>
import Vue from 'vue';
import TheNavBar from '@/components/bar/TheNavBar.vue';
import TheContent from '@/components/TheContent.vue'

export default Vue.extend({
  name: 'App',
  components: {
    TheNavBar,
    TheContent,
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
