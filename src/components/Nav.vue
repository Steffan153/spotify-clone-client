<template>
  <div class="upperNav">
    <div class="content">
      <a @click.prevent="goBack" class="back_btn">
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M15.54 21.15L5.095 12.23 15.54 3.31l.65.76-9.555 8.16 9.555 8.16"
          />
        </svg>
      </a>
      <router-link class="loginButton" :to="{name: 'Login'}" v-if="!loggedIn">Login</router-link>
      <button v-else class="loginButton">Logout</button>
      <!-- still not working -->
      <!-- that means that the store is not working ? -->
      <!-- it is not triggering an update -->
      <!-- so the value is being set in the store ? -->
      <!-- Well, let me test -->
      <!-- yeah it is set -->
      <!-- maybe we need an observable or something -->
      <!-- yeah I can try that -->
      <!-- just need to install rxjs -->
      <!-- ok? -->
      <!-- you have the vue dev tools ? -->
      <!-- I can install them in just a second -->
      <!-- ok -->
      <!-- I dont like cluttering my browsers :) -->
      <!-- you could try in the console -->
      <!--  you could read this article 
      https://forum.vuejs.org/t/re-render-component-with-api-call-based-on-vuex-store-change/62253/3-->
      <!-- Yes the user is set -->
      <!-- Ill try that -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      fromRoute: null,
      loggedIn: false
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.fromRoute = from;
    });
  },
  mounted() {
    this.loggedIn = !!this.$store.state.auth.user;
    // doesnt work without this
  },
  computed: mapState({
    user: s => s.auth.user
  }),
  watch: {
    user() {
      this.loggedIn = !!this.$store.state.auth.user; // why is this two !!
      // wdym
      // why you wrote two !! you dont need them
      // this should still work
      // what should still work
      // oh that works too
      // just to convert it to bool
      // to make it cleaner
      // Oh ok , at the end of the project we will find random comments above complex code saying 'lol'
      // it is less confusing
      // yes lol
      // wdym
    }
  },
  // WORKING!!!

  // lol 👏👏
  // lol
  methods: {
    // lol
    // that is there for a purpose
    // I have to tell this to Ivan
    // this is hilarious
    // and leave that there :tf:
    goBack() {
      if (this.fromRoute) this.$router.back();
      else {
        if (this.$router.history.current.path !== "/") this.$router.push("/");
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
.loginButton {
  color: white;
  border-radius: 20px;
  padding: 7px 30px;
  font-size: 14px;
  background: $greyLight;
  opacity: 1;
  cursor: pointer;
  border: none;
  font-family: inherit;
  text-decoration: none;
}

.upperNav {
  background: rgba(9, 9, 9, 0.78);
  height: 56px;
  width: 100%;
  color: white;
  padding: 0.5rem 2rem;
  position: fixed;
  top: 0;
  z-index: 2;
}

.upperNav .content {
  width: calc(100% - 260px);
  // margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.back_btn {
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: $greyLight;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  cursor: pointer;
}

.back_btn svg {
  width: 20px;
  height: 20px;
}
</style>