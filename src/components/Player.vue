<template>
  <div class="musicControls" v-if="$store.state.player.currentSong.id">music controls</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
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
</style>