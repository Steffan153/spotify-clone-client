<template>
  <div class="card">
    <div class="cardImage">
      <img :src="image" loading="lazy" :alt="`${name} picture`" />
    </div>
    <div class="cardContent">
      <h3>{{ name }}</h3>
      <span>{{ description }}</span>
    </div>
    <span class="playIcon">
      <svg height="16" role="img" width="16" viewBox="0 0 24 24">
        <polygon points="21.57 12 5.98 3 5.98 21 21.57 12" fill="currentColor" />
      </svg>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    image: String,
    name: String,
    description: String
  }
};
</script>

<style lang="scss">
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
    box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2);
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
</style>