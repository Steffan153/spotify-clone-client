<template>
  <div class="mainInner">
    <h1>My Library</h1>
    <div class="cardWrapper">
      <router-link to="/library/songs">
        <div class="card">
          <div class="cardImage">
            <img
              src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
              loading="lazy"
              :alt="`liked songs picture`"
            />
          </div>
          <div class="cardContent">
            <h3>Liked Songs</h3>
            <span>The songs you liked</span>
          </div>
          <span class="playIcon">
            <svg height="16" role="img" width="16" viewBox="0 0 24 24">
              <polygon points="21.57 12 5.98 3 5.98 21 21.57 12" fill="currentColor" />
            </svg>
          </span>
        </div>
      </router-link>
      <router-link
        v-for="playlist in playlists"
        :to="{ name: 'Playlists', params: { id: playlist.id }}"
        :key="playlist.id"
      >
        <song-card
          :name="playlist.name"
          :image="playlist.image_path"
          :description="playlist.description"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SongCard from "../components/SongCard.vue";

export default {
  components: { SongCard },
  metaInfo() {
    return {
      title: "Spotify Clone - My Library"
    };
  },
  computed: mapState({
    user: s => s.auth.user,
    playlists: s => s.likes.likes.playlists
  }),
  watch: {
    user() {
      if (!this.$store.state.auth.user) {
        this.$router.push({ name: "Home" });
      }
    }
  }
};
</script>


<style lang="scss" scoped>
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