<template>
  <div class="mainInner">
    <div class="nameRow">
      <h1>Add Category</h1>
    </div>
    <form @submit.prevent="sumbit">
      <div class="group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="name" />
      </div>
      <div class="group">
        <label for="description">Description</label>
        <input type="text" id="description" v-model="description" placeholder="( Optional )" />
      </div>
      <button type="submit" :class="{'disabled': loading}">{{ loading ? 'Loading...' : 'Add' }}</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  metaInfo() {
    return {
      title: "Spotify Clone - Add Category"
    };
  },
  data() {
    return {
      name: "",
      description: "",
      loading: false
    };
  },
  methods: {
    async sumbit() {
      if (!this.name) return;
      this.loading = true;
      this.$Progress.start();
      try {
        await axios.post("/api/categories", {
          name: this.name,
          description: this.description
        });
        this.$toast.success("Created successfully !");
        this.$Progress.finish();
      } catch (err) {
        console.log(err);
        this.$toast.error("Failed to create !");
        this.$Progress.fail();
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/dashboard";
</style>