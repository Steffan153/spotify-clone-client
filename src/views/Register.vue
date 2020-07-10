<template>
  <div class="mainInner">
    <div class="formWrapper">
      <h1>Create an account</h1>
      <form @submit.prevent="register" class="loginForm">
        <input type="text" placeholder="Name" v-model="name" required />
        <input type="text" placeholder="Email" v-model="email" required />
        <input type="password" placeholder="Password" v-model="password" required />
        <button type="submit">Register</button>
      </form>
      <router-link :to="{name: 'Login'}">Already have an account ?</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  metaInfo() {
    return {
      title: "Spotify Clone - Register"
    };
  },
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    async register() {
      this.$Progress.start();
      try {
        const { data } = await axios.post("/api/auth/register", {
          name: this.name,
          email: this.email,
          password: this.password
        });
        this.$store.dispatch("auth/login", data);
        axios.get("/api/likes").then(res => {
          this.$store.dispatch("likes/saveAllLikes", res.data);
          this.$router.push({ name: "Home" });
          this.$Progress.finish();
        });
      } catch (err) {
        console.log(err);
        this.$Progress.fail();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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

a {
  color: #fff;
}
</style>