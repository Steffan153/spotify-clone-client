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
      <div class="popupMenuContainer" v-else>
        <button class="loginButton" v-on-clickaway="closePopup" @click="togglePopup">
          {{ user.name }}
          <svg viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M15.54 21.15L5.095 12.23 15.54 3.31l.65.76-9.555 8.16 9.555 8.16"
            />
          </svg>
        </button>
        <ul class="popupMenu" v-if="isOpen">
          <li>
            <router-link to="/profile">Profile</router-link>
          </li>
          <li @click="logout" class="logoutButton">Logout</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mixin as clickaway } from "vue-clickaway";
export default {
  mixins: [clickaway],
  data() {
    return {
      fromRoute: null,
      loggedIn: false,
      isOpen: false
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.fromRoute = from;
    });
  },
  mounted() {
    this.loggedIn = !!this.$store.state.auth.user;
  },
  computed: mapState({
    user: s => s.auth.user
  }),
  watch: {
    user() {
      this.loggedIn = !!this.$store.state.auth.user;
    }
  },
  methods: {
    goBack() {
      if (this.fromRoute) this.$router.back();
      else {
        if (this.$router.history.current.path !== "/") this.$router.push("/");
      }
    },
    logout() {
      this.$store.dispatch("auth/logout");
    },
    togglePopup() {
      this.isOpen = !this.isOpen;
    },
    closePopup() {
      this.isOpen = false;
    }
  }
};
</script>

<style lang="scss" scoped>
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
  outline: none;
  svg {
    width: 10px;
    height: 10px;
    transform: rotate(-90deg);
    margin-left: 6px;
  }
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

.popupMenuContainer {
  position: relative;
}

.popupMenu {
  position: absolute;
  background: $greyDark;
  padding: 7px 0;
  left: 0;
  margin-top: 10px;
  margin-left: -20px;
  list-style: none;
  width: 150px;
  border-radius: 4px;
}

.popupMenu li {
  color: #fff;
  &.logoutButton {
    padding: 10px 30px;
    &:hover {
      color: red;
    }
  }
  a {
    padding: 10px 30px;
    color: inherit;
    display: block;
    text-decoration: none;
  }
  cursor: pointer;
  &:hover {
    background: $greyLight;
  }
}
</style>