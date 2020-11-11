<template>
  <div>
      <ul class="categories-list">
          <li><a href="#">Lorem</a></li>
          <li><a href="#">Ispum</a></li>
          <li><a href="#">Lorem</a></li>
          <li><a href="#">Ispum</a></li>
          <li><a href="#">Lorem</a></li>
          <li><a href="#">Ispum</a></li>
          <li><a href="#">Lorem</a></li>
          <li><a href="#">Ispum</a></li>
          <li><a href="#">Lorem</a></li>
          <li><a href="#">Ispum</a></li>
      </ul>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
    name: 'TheCategories'
});
</script>

<style lang="scss" scoped>
.categories-list {
    columns: 2;
}
</style>