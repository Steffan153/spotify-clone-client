<template>
  <div class="mainInner">
    <h1>Showing playlist results for "{{ this.term }}"</h1>
    <alert v-if="playlists && !playlists.total" msg="No playlists !" />
    <div
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <div v-if="playlists">
        <div class="cardWrapper">
          <router-link
            v-for="playlist in playlists.data"
            :key="playlist.id"
            :to="{ name: 'Playlists', params: { id: playlist.id }}"
          >
            <song-card
              :name="playlist.name"
              :image="playlist.image_path"
              :description="playlist.description"
            />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import Alert from "../components/Alert.vue";
import SongCard from "../components/SongCard.vue";

export default {
  data() {
    return {
      page: 1,
      loading: false,
      playlists: { data: [] }
    };
  },
  metaInfo() {
    return {
      title: "Spotify Clone - Search Playlists"
    };
  },
  components: { Alert, SongCard },
  computed: mapState({
    searchPlaylists: s => s.search.playlists,
    term: s => s.search.term
  }),
  watch: {
    searchPlaylists() {
      this.playlists = this.searchPlaylists;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.$store.state.search.term) vm.$router.push({ name: "Search" });
      else vm.playlists = vm.searchPlaylists;
    });
  },
  methods: {
    async loadMore() {
      if (
        this.playlists &&
        this.playlists.last_page === this.playlists.current_page &&
        !this.loading
      )
        this.loading = true;
      else {
        this.loading = true;
        try {
          const { data } = await axios.get(
            `/api/search/playlists?q=${this.term}&page=${this.page}`
          );

          const prevData = this.playlists ? this.playlists.data : [];
          this.$store.dispatch("search/saveSearchPlaylists", {
            ...data,
            data: [...prevData, ...data.data]
          });
          this.page++;
          this.loading = false;
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  margin: 20px 0;
}
.cardWrapper {
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(164px, 1fr));
  margin-top: 30px;
  a {
    color: inherit;
    text-decoration: none;
  }
}
</style>