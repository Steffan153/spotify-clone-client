<template>
  <form @submit.prevent="login">
    <input type="text" placeholder="Name" v-model="name" required />
    <input type="text" placeholder="Email" v-model="email" required />
    <input type="password" placeholder="Password" v-model="password" required />
    <button type="submit">Register</button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    async login() {
      try {
        const { data } = await axios.post("/api/auth/register", {
          email: this.email,
          password: this.password,
          name: this.name
        });
        this.$store.dispatch("auth/register", data);
      } catch (err) {
        // Let me start up the client and server
        console.log(err);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>