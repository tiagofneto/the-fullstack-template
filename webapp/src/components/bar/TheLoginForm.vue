<template>
  <b-form @submit="onSubmit">
    <b-form-group
      label="Email"
      label-for="email-input-login"
      invalid-feedback="Invalid email"
    >
      <b-form-input
        type="email"
        id="email-input-login"
        v-model="email"
        :state="emailState"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      label="Password"
      label-for="password-input-login"
      invalid-feedback="Invalid password"
    >
      <b-form-input
        type="password"
        id="password-input-login"
        v-model="password"
        :state="passwordState"
      ></b-form-input>
    </b-form-group>

    <b-button type="submit" variant="primary">Login</b-button>
  </b-form>
</template>

<script>
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  name: "TheLoginForm",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault()
      try {
        const res = await axios.post("http://localhost:4000/graphql", {
          query: `
            query ($email: String!, $password: String!) {
              login(email: $email, password: $password) {
                token
                expiration
              }
            }`,
          variables: {
            email: this.email,
            password: this.password,
          },
        })
        const authData = res.data.data.login
        const token = authData.token
        const expire = authData.expiration
        this.$cookie.set('jwt', token, { expires: expire })
      } catch (e) {
        console.log(e)
      }
      window.location.reload();
    },
  },
  computed: {
    emailState() {
      return this.email.length >= 5;
    },
    passwordState() {
      return this.password.length >= 6;
    },
  },
});
</script>

<style lang="scss" scoped>
</style>