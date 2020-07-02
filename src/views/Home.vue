<template>
  <div class="mainInner" ref="mainInnerRef">
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
</template>

<script>
import PlaylistSection from "../components/PlaylistSection.vue";
import { getAllPlaylists } from "../api/playlists";
import { mapState } from "vuex";

export default {
  metaInfo() {
    return {
      title: "Spotify Clone - Home"
    };
  },
  computed: mapState({
    playlists: s => s.playlists.playlists
  }),
  watch: {
    playlists() {
      this.playlists = this.$store.state.playlists.playlists;
    }
  },
  async beforeRouteEnter(to, from, next) {
    next(async vm => {
      try {
        const data = await getAllPlaylists();
        console.log(data);
        vm.$Progress.start();
        vm.$store.dispatch("playlists/savePlaylists", data);
        vm.playlists = data;
        vm.$Progress.finish();
      } catch (err) {
        vm.$Progress.fail();
        console.log(err);
      }
    });
  },
  components: {
    PlaylistSection
  },
  data() {
    return {
      limiter: 0
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
