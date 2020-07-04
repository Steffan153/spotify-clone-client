<template>
  <div class="cardsWrapInner">
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
</template>

<script>
import SongCard from "./SongCard.vue";
export default {
  components: { SongCard },
  props: {
    limiter: Number,
    playlists: Array
  }
};
</script>

<style lang="scss">
</style>