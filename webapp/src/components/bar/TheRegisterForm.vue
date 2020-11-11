<template>
  <b-form @submit="onSubmit">
    <b-form-group
      label="Email"
      label-for="email-input-register"
      invalid-feedback="Invalid email"
    >
      <b-form-input
        type="email"
        id="email-input-register"
        v-model="email"
        :state="emailState"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      label="Password"
      label-for="password-input-register"
      invalid-feedback="Invalid password"
    >
      <b-form-input
        type="password"
        id="password-input-register"
        v-model="password"
        :state="passwordState"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      label="Confirm Password"
      label-for="confirm-password-input-register"
      invalid-feedback="Passwords don't match"
    >
      <b-form-input
        type="password"
        id="confirm-password-input-register"
        v-model="confirmPassword"
        :state="equalPasswords()"
      ></b-form-input>
    </b-form-group>

    <b-button type="submit" variant="primary">Register</b-button>
  </b-form>
</template>

<script>
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  name: "TheRegisterForm",
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    equalPasswords() {
      return this.password === this.confirmPassword && this.passwordState;
    },
    async onSubmit() {
      try {
        await axios.post("http://localhost:4000/graphql", {
          query: `
            mutation ($email: String!, $password: String!) {
              createUser(email: $email, password: $password) {
                email
                password
              }
            }`,
          variables: {
            email: this.email,
            password: this.password,
          },
        })
      } catch (e) {
        console.log(e)
      }
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