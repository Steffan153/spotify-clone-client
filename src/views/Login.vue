<template>
  <div class="mainInner">
    <div class="formWrapper">
      <h1>Login</h1>
      <form @submit.prevent="login" class="loginForm">
        <input type="text" placeholder="Email" v-model="email" required />
        <input type="password" placeholder="Password" v-model="password" required />
        <button type="submit">Login</button>
      </form>
      <router-link :to="{name: 'Register'}" class="link">Need an account?</router-link>
    </div>
  </div>
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
  metaInfo() {
    return {
      title: "Spotify Clone - Login"
    };
  },
  methods: {
    async login() {
      this.$Progress.start();
      try {
        const { data } = await axios.post("/api/auth/login", {
          email: this.email,
          password: this.password
        });
        this.$store.dispatch("auth/login", data);
        this.$router.push({ name: "Home" });
        this.$Progress.finish();
      } catch (err) {
        console.log(err);
        this.$Progress.fail();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$greyDark: #040404;
$greyLight: #131313;
$greyLighter: #282828;
$greyText: #b3b3b3;
$greyNav: #090909;
$greenMain: #1db954;

h1 {
  margin: 20px 0;
  font-size: 50px;
}

.formWrapper {
  width: 500px;
  max-width: 100%;
  margin: 0 auto;
}

.loginForm {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.loginForm input {
  padding: 10px 17px;
  margin: 10px 0;
  outline: none;
  background: $greyDark;
  border: none;
  font-family: inherit;
  color: $greyText;
}

.loginForm button {
  width: auto;
  padding: 10px 17px;
  margin: 10px 0;
  cursor: pointer;
  background: $greenMain;
  border: none;
  border-radius: 20px;
  color: #fff;
  font-family: inherit;
}

.link {
  color: white;
}
</style>
