<template>
  <div class="mainInner">
    <div class="nameRow">
      <h1>Edit Song</h1>
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
        <label for="playlistId">Playlist ID</label>
        <input type="text" id="playlistId" v-model="playlistId" />
      </div>

      <div class="group">
        <label for="song">Song</label>
        <label for="song" class="songLabel">
          <p v-if="song">{{ song.name }}</p>
          <svg v-else class="noteI" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M334.938 102.697c-30.917-24.154-57.604-45.007-57.604-91.999C277.333 4.785 272.563 0 266.667 0S256 4.785 256 10.698v351.53c0 11.805-9.563 21.396-21.333 21.396H192c-47.063 0-85.333 28.793-85.333 64.188S144.937 512 192 512s85.333-28.793 85.333-64.188V77.853c12.349 16.53 28.538 29.241 44.5 41.706C353.792 144.548 384 168.138 384 223.154c0 5.913 4.771 10.698 10.667 10.698s10.667-4.785 10.667-10.698c-.001-65.463-37.396-94.694-70.396-120.457zM256 447.812c0 23.193-29.313 42.792-64 42.792s-64-19.599-64-42.792 29.313-42.792 64-42.792h42.667A42.214 42.214 0 00256 399.274v48.538z"
            />
          </svg>
        </label>
        <input
          class="songInput"
          type="file"
          id="song"
          accept=".mp3"
          ref="song"
          @change="handelChange"
        />
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
      title: "Spotify Clone - Edit Song"
    };
  },
  async beforeRouteEnter(to, from, next) {
    try {
      const { data } = await axios.post(`/api/songs/${to.params.id}/edit`);

      next(vm => {
        vm.id = to.params.id;
        vm.name = data.name;
        vm.artist = data.artist ? data.artist : "";
        vm.playlistId = data.playlist.id;
      });
    } catch (e) {
      next(vm => {
        vm.$Progress.fail();
        vm.$router.push({ name: "Songs.index" });
      });
    }
  },
  data() {
    return {
      id: 0,
      name: "",
      artist: "",
      playlistId: "",
      song: null,
      loading: false
    };
  },
  methods: {
    clear() {
      this.song = null;
      this.$refs.song.value = null;
    },
    handelChange(e) {
      return this.readURL(e.target);
    },
    readURL(input) {
      const self = this;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function() {
          self.song = input.files[0];
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    async sumbit() {
      if (!this.name || !this.playlistId) return;
      this.loading = true;
      this.$Progress.start();
      try {
        const sendData = new FormData();
        sendData.append("name", this.name);
        sendData.append("artist", this.artist);
        sendData.append("playlist_id", this.playlistId);
        sendData.append("song", this.song);
        sendData.append("_method", "put");
        await axios.post(`/api/songs/${this.id}`, sendData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        this.$toast.success("Updated successfully !");
        this.$Progress.finish();
        this.$router.push({ name: "Songs.index" });
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