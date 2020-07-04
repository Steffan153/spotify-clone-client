<template>
  <div class="mainInner">
    <h1>{{ data.name }}</h1>
    <p class="subText">{{ data.description }}</p>
    <div class="cardWrapper">
      <router-link
        v-for="playlist in data.playlists"
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
import SongCard from "../components/SongCard.vue";
import axios from "axios";
export default {
  metaInfo() {
    return {
      title: "Spotify Clone - " + this.data.name
    };
  },
  components: {
    SongCard
  },
  data() {
    return {
      data: {}
    };
  },
  async beforeRouteEnter(to, from, next) {
    try {
      const { data } = await axios.get("/api/categories/" + to.params.id);
      next(vm => {
        vm.data = data;
      });
    } catch (e) {
      next(vm => {
        vm.$Progress.fail();
        vm.$router.push({ name: "Home" });
      });
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