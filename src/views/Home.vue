<template>
  <div class="mainInner" ref="mainInnerRef" v-if="playlists">
    <div
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <div class="cardsWrap" v-for="category in playlists.data" :key="category.id">
        <div class="nameRow">
          <h2>{{ category.name }}</h2>
          <router-link :to="{name: 'Category', params: {id: category.id}}">see all</router-link>
        </div>
        <p class="subText">{{ category.description }}</p>
        <playlist-section
          v-if="category.playlists.length"
          :playlists="category.playlists"
          :limiter="limiter"
        />
        <alert v-else msg="No playlists for this category yet !" />
      </div>
    </div>
  </div>
</template>

<script>
import PlaylistSection from "../components/PlaylistSection.vue";
import Alert from "../components/Alert.vue";

import { mapState } from "vuex";
import { getAllPlaylists } from "../api/playlists";

export default {
  metaInfo() {
    return {
      title: "Spotify Clone - Home"
    };
  },
  computed: mapState({
    playlists: s => s.playlists.playlists
  }),
  components: {
    PlaylistSection,
    Alert
  },
  data() {
    return {
      limiter: 0,
      loading: false,
      page: 2
    };
  },
  mounted() {
    this.handleWindowResize();
    window.addEventListener("resize", this.handleWindowResize);
  },
  methods: {
    handleWindowResize() {
      if (!this.$refs["mainInnerRef"]) return;
      const calculation = Math.floor(
        this.$refs["mainInnerRef"].getBoundingClientRect().width / 195
      );

      this.limiter = calculation;
    },
    loadMore() {
      if (
        this.$store.state.playlists.playlists.last_page ===
          this.$store.state.playlists.playlists.current_page &&
        !this.loading
      )
        this.loading = true;
      else {
        this.loading = true;
        getAllPlaylists(this.page)
          .then(data => {
            this.$store.dispatch("playlists/savePlaylists", {
              ...data,
              data: [
                ...this.$store.state.playlists.playlists.data,
                ...data.data
              ]
            });
            this.page++;
          })
          .then(() => (this.loading = false));
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleWindowResize);
  }
};
</script>

<style lang="scss" scoped>
.nameRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    color: #fff;
    text-transform: uppercase;
    text-decoration: none;
    border-bottom: 2px solid transparent;
    font-size: 14px;
    color: $greyText;
    &:hover {
      color: #fff;
      border-color: #fff;
    }
  }
}
</style>
