<template>
  <div class="mainInner">
    <div class="nameRow">
      <h1>Add Playlist</h1>
    </div>
    <form @submit.prevent="sumbit">
      <div class="group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="name" />
      </div>
      <div class="group">
        <label for="artist">Artist</label>
        <input type="text" id="artist" v-model="artist" />
      </div>
      <div class="group">
        <label for="description">Description</label>
        <input type="text" id="description" v-model="description" />
      </div>
      <div class="group">
        <label for="category">Category</label>
        <select id="category" v-model="category_id">
          <option value="0">Select a category</option>
          <option
            :value="category.id"
            v-for="category in categories"
            :key="category.id"
          >{{ category.name }}</option>
        </select>
      </div>
      <div class="group">
        <label for="image">Image</label>
        <div class="imagePreview" v-if="src">
          <img :src="src" alt="Image" />
          <div class="overlay" @click="clear">
            <svg
              height="427pt"
              viewBox="-40 0 427 427.00131"
              width="427pt"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"
              />
              <path
                d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"
              />
              <path
                d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0"
              />
              <path
                d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"
              />
            </svg>
          </div>
        </div>
        <label for="image" class="imageLabel" v-else>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480">
            <path
              d="M440 72H40C17.92 72.026.026 89.92 0 112v256c.026 22.08 17.92 39.974 40 40h400c2.245.009 4.486-.187 6.696-.584C465.945 404.194 480.037 387.517 480 368V112c-.026-22.081-17.92-39.974-40-40zM40 392c-12.435-.002-22.81-9.501-23.904-21.888L175.6 265.824 337.808 392H40zm424-24c.013 11.742-8.492 21.761-20.08 23.656-1.294.233-2.606.348-3.92.344h-76.136l-105.992-82.488 94.784-75.792L464 300.528V368zm0-86.128l-107.88-64.728c-2.868-1.725-6.506-1.482-9.12.608l-102.136 81.68-63.96-49.744c-2.695-2.094-6.421-2.249-9.28-.384L16 351.056V112c0-13.255 10.745-24 24-24h400c13.255 0 24 10.745 24 24v169.872z"
            />
            <path
              d="M240 120c-26.51 0-48 21.49-48 48 .026 26.499 21.501 47.974 48 48 26.51 0 48-21.49 48-48s-21.49-48-48-48zm0 80c-17.673 0-32-14.327-32-32s14.327-32 32-32c17.673 0 32 14.327 32 32s-14.327 32-32 32z"
            />
          </svg>
        </label>
        <input
          type="file"
          id="image"
          accept=".png, .jpg, .jpeg"
          class="imageInput"
          ref="image"
          @change="handelChange"
        />
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
      artist: "",
      category_id: 0,
      description: "",
      categories: [],
      loading: false,
      image: null,
      src: null
    };
  },
  async beforeRouteEnter(to, from, next) {
    try {
      const { data } = await axios.get("/api/playlists/create");
      next(vm => {
        vm.categories = data.categories;
      });
    } catch (err) {
      console.log(err);
      this.$Progress.fail();
    }
  },
  methods: {
    clear() {
      this.src = null;
      this.image = null;
      this.$refs.image.value = null;
    },
    handelChange(e) {
      return this.readURL(e.target);
    },
    readURL(input) {
      const self = this;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
          self.src = e.target.result;
          self.image = input.files[0];
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    async sumbit() {
      if (!this.name) return;
      this.loading = true;
      this.$Progress.start();
      try {
        const sendData = new FormData();
        sendData.append("name", this.name);
        sendData.append("description", this.description);
        sendData.append("artist", this.artist);
        sendData.append("category_id", this.category_id);
        sendData.append("image", this.image);
        await axios.post("/api/playlists", sendData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
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