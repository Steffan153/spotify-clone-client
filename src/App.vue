<template>
  <div class="outerWrap">
    <div class="App">
      <Sidebar />
      <div class="main">
        <Nav />
        <div class="mainContent">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <div class="musicControls">music controls</div>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";
import Sidebar from "./components/Sidebar.vue";

export default {
  metaInfo() {
    return {
      title: "Spotify Clone"
    };
  },
  components: {
    Nav,
    Sidebar
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
$greyDark: #040404;
$greyLight: #131313;
$greyLighter: #282828;
$greyText: #b3b3b3;
$greyNav: #090909;
$greenMain: #1db954;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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

.outerWrap {
  background: grey;
  height: 100vh;
  min-height: 100%;
}

.musicControls {
  background: $greyLighter;
  text-align: center;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  z-index: 2;
  position: relative;
  border-top: 1px solid $greyDark;
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
  .card {
    background: $greyLighter;
    border-radius: 8px;
    overflow: hidden;
    padding: 1.2rem;
    box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2);
    position: relative;
    &:hover {
      .playIcon {
        opacity: 1;
      }
    }
    .cardImage {
      height: 160px;
      box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.3),
        0 1px 2px 0 rgba(0, 0, 0, 0.2);
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .cardContent {
      padding: 0.4rem 0;
      h3 {
        font-weight: 600;
        font-size: 0.9rem;
        margin-bottom: 0;
        letter-spacing: 0.6px;
      }
      span {
        font-size: 0.8rem;
        color: $greyText;
      }
    }
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

ul.songList {
  padding: 0;
  margin-top: 20px;
  li {
    list-style-type: none;
    width: 100%;
    padding: 0.8rem;
    display: flex;
    align-items: center;
    transition: background 0.2s ease-in-out;
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      .songIcon {
        .noteI {
          display: none;
        }
        .playI {
          display: block;
        }
      }
    }
    .songDetails {
      h3 {
        margin: 0;
        font-weight: 300;
        font-size: 1rem;
      }
      span {
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.9rem;
      }
    }
    .songTime {
      margin-left: auto;
    }
    .songIcon {
      padding-right: 1rem;
      .playI {
        display: none;
      }
      svg {
        fill: rgba(255, 255, 255, 0.7);
        width: 15px;
        height: 15px;
      }
    }
  }
}
</style>
