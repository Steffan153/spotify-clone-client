<template>
  <div class="cardsWrapInner">
    <router-link
      v-for="playlist in playlists"
      :to="{ name: 'Playlists', params: { id: playlist.id }}"
      :key="playlist.id"
    >
      <div class="card">
        <div class="cardImage">
          <img :src="playlist.image_path" loading="lazy" :alt="`${playlist.name} picture`" />
        </div>
        <div class="cardContent">
          <h3>{{ playlist.name }}</h3>
          <span>{{ playlist.description }}</span>
        </div>
        <span class="playIcon">
          <svg height="16" role="img" width="16" viewBox="0 0 24 24">
            <polygon points="21.57 12 5.98 3 5.98 21 21.57 12" fill="currentColor" />
          </svg>
        </span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    limiter: Number,
    playlists: Array
  }
};
</script>

<style lang="scss">
</style>