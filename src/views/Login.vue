<template>
  <form @submit.prevent="login">
    <input type="text" placeholder="Email" v-model="email" required />
    <input type="password" placeholder="Password" v-model="password" required />
    <button type="submit">Login</button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async login() {
      try {
        const { data } = await axios.post("/api/auth/login", {
          email: this.email,
          password: this.password
        });
        this.$store.dispatch("auth/login", data);
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