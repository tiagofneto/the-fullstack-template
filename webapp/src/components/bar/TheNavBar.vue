<template>
  <b-navbar toggleable="sm" variant="primary" type="light" sticky>
    <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

    <b-navbar-brand href="#">Lorem Ipsum</b-navbar-brand>

    <b-collapse id="nav-text-collapse" is-nav>
      <!-- ml-auto => right align -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="#">About</b-nav-item>
        <div v-if="isLogged">
          <b-nav-item v-if="isLogged" href="#">{{
            currentUser.email
          }}</b-nav-item>
          <b-nav-item href="#" @click="logout"> Logout </b-nav-item>
        </div>
        <div v-else>
          <b-nav-item-dropdown text="Sign-In" right>
            <TheLoginForm />
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Sign-Up" right>
            <TheRegisterForm />
          </b-nav-item-dropdown>
        </div>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import TheLoginForm from "@/components/bar/TheLoginForm.vue";
import TheRegisterForm from "@/components/bar/TheRegisterForm.vue";

export default Vue.extend({
  // apollo: {
  //   currentUser: gql`
  //     query {
  //       currentUser {
  //         email
  //       }
  //     }
  //   `,
  // },
  name: "TheNavBar",
  components: {
    TheLoginForm,
    TheRegisterForm,
  },
  data() {
    return {
      currentUser: {
        email: "",
      },
    };
  },
  computed: {
    isLogged() {
      return this.currentUser.email != "";
    },
  },
  methods: {
    logout() {
      this.$cookie.delete("jwt");
      window.location.reload();
    },
  },
  async mounted() {
    try {
      const res = await axios.post(
        "http://localhost:4000/graphql",
        {
          query: `
          query {
            currentUser {
              email
            }
          }`,
        },
        {
          headers: {
            Authorization: "Bearer " + this.$cookie.get("jwt"),
          },
        }
      );
      const user = res.data.data.currentUser
      if (user) this.currentUser = res.data.data.currentUser;
    } catch (e) {
      console.log(e);
    }
  },
});
</script>

<style lang="scss" scoped>
</style>