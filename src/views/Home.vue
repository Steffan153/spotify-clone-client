<template>
  <div class="mainInner" ref="mainInnerRef">
    <div class="cardsWrap" v-for="category in categories" :key="category.id">
      <h2>{{ category.name }}</h2>
      <!-- <span class="seeAll">SEE ALL</span> -->
      <p class="subText">{{ category.tagline }}</p>
      <playlist-section :category_id="category.id" :limiter="limiter" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
import PlaylistSection from "../components/PlaylistSection.vue";
export default {
  name: "Home",
  components: {
    PlaylistSection
  },
  data() {
    return {
      limiter: 5,
      categories: [
        {
          id: 1,
          name: "Focus",
          tagline: "Music to help you concentrate"
        },
        {
          id: 2,
          name: "Mood",
          tagline: "Playlists to match your mood"
        },
        {
          id: 3,
          name: "Soundtrack your home",
          tagline: ""
        },
        {
          id: 4,
          name: "Kick back this Sunday..."
        }
      ]
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
