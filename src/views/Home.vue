<template>
  <div class="mainInner" ref="mainInnerRef">
    <div
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <div class="cardsWrap" v-for="category in playlists.data" :key="category.id">
        <h2>{{ category.name }}</h2>
        <p class="subText">{{ category.description }}</p>
        <playlist-section
          v-if="category.playlists.length"
          :playlists="category.playlists"
          :limiter="limiter"
        />
        <div class="noData" v-else>
          <p>No playlists for this category yet !</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlaylistSection from "../components/PlaylistSection.vue";
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
    PlaylistSection
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
.noData {
  width: 100%;
  margin: 10px 0;
  background: red;
  color: white;
  border-radius: 4px;
  padding: 12px 20px;
}
</style>
