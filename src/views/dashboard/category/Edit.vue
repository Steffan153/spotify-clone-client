<template>
  <div class="mainInner">
    <div class="nameRow">
      <h1>Edit Category</h1>
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
      <button type="submit" :class="{'disabled': loading}">{{ loading ? 'Loading...' : 'Update' }}</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  metaInfo() {
    return {
      title: "Spotify Clone - Edit Category"
    };
  },
  async beforeRouteEnter(to, from, next) {
    try {
      const { data } = await axios.post(`/api/categories/${to.params.id}/edit`);

      next(vm => {
        vm.id = to.params.id;
        vm.name = data.name;
        vm.description = data.description;
      });
    } catch (e) {
      next(vm => {
        vm.$Progress.fail();
        vm.$router.push({ name: "Categories.index" });
      });
    }
  },
  data() {
    return {
      id: 0,
      name: "",
      description: "",
      loading: false
    };
  },
  mounted() {
    console.log(this.id);
  },
  methods: {
    async sumbit() {
      if (!this.name) return;
      this.loading = true;
      this.$Progress.start();
      try {
        await axios.put(`/api/categories/${this.id}`, {
          name: this.name,
          description: this.description
        });
        this.$toast.success("Updated successfully !");
        this.$Progress.finish();
        this.$router.push({ name: "Categories.index" });
      } catch (err) {
        console.log(err);
        this.$toast.error("Failed to update !");
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