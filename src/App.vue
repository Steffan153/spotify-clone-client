<template>
  <div class="outerWrap">
    <div class="App" :class="{'full': !$store.state.player.currentSong.id}">
      <Sidebar />
      <div class="main">
        <Nav />
        <div class="mainContent">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <player />
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";
import Sidebar from "./components/Sidebar.vue";
import Player from "./components/Player.vue";

export default {
  metaInfo() {
    return {
      title: "Spotify Clone"
    };
  },
  components: {
    Nav,
    Sidebar,
    Player
  },
  mounted() {
    this.$Progress.finish();
  },
  created() {
    this.$Progress.start();
    this.$router.beforeEach((to, from, next) => {
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress;
        this.$Progress.parseMeta(meta);
      }
      this.$Progress.start();
      next();
    });
    this.$router.afterEach(() => {
      this.$Progress.finish();
    });
  }
};
</script>  

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.toast-text {
  padding: 7px 20px !important;
  padding-right: 30px !important;
}

.notices .toast {
  min-height: 3.3em !important;
}

.notices .toast-success {
  background: $greenMain !important;
}

@font-face {
  font-family: circular-book;
  src: url(./fonts/CircularStd-Book.otf);
}

@font-face {
  font-family: circular-bold;
  src: url(./fonts/CircularStd-Bold.otf);
}

@font-face {
  font-family: circular-black;
  src: url(./fonts/CircularStd-Black.otf);
}

.uppercase {
  text-transform: uppercase;
}

.smallText {
  font-size: 0.75rem;
  letter-spacing: 0.8px;
  &.bold {
    font-weight: 600;
  }
}

* {
  box-sizing: border-box;
}

body {
  font-family: circular-book;
  margin: 0;
  padding: 0;
}

.subText {
  font-size: 0.9rem;
  color: $greyText;
}

.App {
  height: calc(100vh - 90px);
  background: $greyLight;
  display: flex;
}

.full {
  height: 100vh;
}

.outerWrap {
  background: grey;
  height: 100vh;
  min-height: 100%;
}

.main {
  width: 100%;
  overflow-y: auto;
  position: relative;
  padding-top: 3.4rem;
  .mainContent {
    color: white;

    .mainInner {
      padding: 0.5rem 2rem;
    }
    h1,
    h2 {
      font-size: 1.8rem;
    }
  }
}

.cardsWrap {
  padding-bottom: 0.8rem;
  margin: 40px 0;
  h2 {
    margin-bottom: 0;
  }
  .cardsWrapInner {
    display: grid;
    grid-gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(164px, 1fr));

    a {
      color: inherit;
      text-decoration: none;
    }
  }
  .subText {
    margin-top: 0.5rem;
    margin-bottom: 1.2rem;
  }
}

.playIcon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  background: $greenMain;
  margin-left: auto;
  opacity: 0;
  position: absolute;
  right: 1.2rem;
  bottom: 1.2rem;
  svg {
    margin: auto;
  }
}
</style>
