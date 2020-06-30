<template>
  <div class="upperNav">
    <a @click.prevent="goBack" class="back_btn">
      <svg viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M15.54 21.15L5.095 12.23 15.54 3.31l.65.76-9.555 8.16 9.555 8.16"
        />
      </svg>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fromRoute: null
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.fromRoute = from;
    });
  },
  mounted() {
    console.log(this.$store.state); // hey let's go to auth.js
  },
  methods: {
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
.upperNav {
  background: rgba(9, 9, 9, 0.78);
  height: 56px;
  width: 100%;
  display: flex;
  align-items: center;
  color: white;
  padding: 0.5rem 2rem;
  position: fixed;
  top: 0;
  z-index: 2;
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