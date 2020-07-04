<template>
  <div class="playlistPage" :style="{backgroundImage: `linear-gradient(${color}, #121212 40%)`}">
    <div class="mainInner">
      <div class="playlistPageInfo">
        <div class="playlistPageImage">
          <img loading="lazy" :src="playlist.image" :alt="`${playlist.name} picture`" />
        </div>
        <div class="playlistPageContent">
          <p class="smallText uppercase bold">Playlist</p>
          <h1>{{ playlist.name }}</h1>

          <p class="tagline">{{ playlist.description }}</p>
          <div class="playlistPageDesc">
            <p class="spotify">{{ uppercaseArtist }}</p>
            <span>{{ playlist.likes }} likes</span>
            <span>{{ totalDuration }}</span>
          </div>
        </div>
      </div>
      <div class="playlistPageSongs">
        <div class="playlistButtons">
          <span class="playIcon" @click="playSong">
            <svg
              height="16"
              role="img"
              width="16"
              viewBox="0 0 24 24"
              v-if="isPlaying && currentSong.playlistID === playlist.id"
            >
              <svg
                class="pause"
                viewBox="-45 0 327 327"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <path
                  d="M158 0h71a8 8 0 018 8v311a8 8 0 01-8 8h-71a8 8 0 01-8-8V8a8 8 0 018-8zm0 0M8 0h71a8 8 0 018 8v311a8 8 0 01-8 8H8a8 8 0 01-8-8V8a8 8 0 018-8zm0 0"
                />
              </svg>
            </svg>

            <svg viewBox="0 0 24 24" v-else>
              <polygon points="21.57 12 5.98 3 5.98 21 21.57 12" fill="currentColor" />
            </svg>
          </span>
          <div class="icons">
            <div class="icon iconsHeart" v-if="user" @click="toggleLike">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                v-if="!playlist.is_liked"
              >
                <path
                  d="M378.667 21.333c-56.792 0-103.698 52.75-122.667 77.646-18.969-24.896-65.875-77.646-122.667-77.646C59.813 21.333 0 88.927 0 172c0 45.323 17.99 87.562 49.479 116.469a10.54 10.54 0 001.677 2.177l197.313 196.906c2.083 2.073 4.802 3.115 7.531 3.115s5.458-1.042 7.542-3.125L467.417 283.74l2.104-2.042c1.667-1.573 3.313-3.167 5.156-5.208a10.372 10.372 0 001.896-2.542C499.438 245.948 512 209.833 512 172c0-83.073-59.812-150.667-133.333-150.667zm80.156 240.615a9.929 9.929 0 00-.802 1.083c-1 1.146-2.094 2.156-3.177 3.188L255.99 464.927 68.667 277.979a10.706 10.706 0 00-2.479-3.177C37.677 249.906 21.333 212.437 21.333 172c0-71.313 50.24-129.333 112-129.333 61.063 0 113.177 79.646 113.698 80.448 3.938 6.083 14 6.083 17.938 0 .521-.802 52.635-80.448 113.698-80.448 61.76 0 112 58.021 112 129.333 0 33.604-11.313 65.552-31.844 89.948z"
                />
              </svg>
              <svg
                class="active"
                v-else
                viewBox="0 -28 512.00002 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m471.382812 44.578125c-26.503906-28.746094-62.871093-44.578125-102.410156-44.578125-29.554687 0-56.621094 9.34375-80.449218 27.769531-12.023438 9.300781-22.917969 20.679688-32.523438 33.960938-9.601562-13.277344-20.5-24.660157-32.527344-33.960938-23.824218-18.425781-50.890625-27.769531-80.445312-27.769531-39.539063 0-75.910156 15.832031-102.414063 44.578125-26.1875 28.410156-40.613281 67.222656-40.613281 109.292969 0 43.300781 16.136719 82.9375 50.78125 124.742187 30.992188 37.394531 75.535156 75.355469 127.117188 119.3125 17.613281 15.011719 37.578124 32.027344 58.308593 50.152344 5.476563 4.796875 12.503907 7.4375 19.792969 7.4375 7.285156 0 14.316406-2.640625 19.785156-7.429687 20.730469-18.128907 40.707032-35.152344 58.328125-50.171876 51.574219-43.949218 96.117188-81.90625 127.109375-119.304687 34.644532-41.800781 50.777344-81.4375 50.777344-124.742187 0-42.066407-14.425781-80.878907-40.617188-109.289063zm0 0"
                />
              </svg>
            </div>
            <div class="icon iconsDots"></div>
          </div>
        </div>

        <ul class="songList" v-for="song in playlist.songs" :key="song.id">
          <playlist-item
            :click="() => playlistItemClicked(song, playlist.image)"
            :song="song"
            :artist="song.artist ? song.artist : playlist.artist"
            :isActive="song.id === currentSong.id"
            :isPlaying="song.id === currentSong.id && isPlaying"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import PlaylistItem from "../components/PlaylistItem.vue";
import { getSinglePlaylist } from "../api/playlists";
import * as Vibrant from "node-vibrant";
import { mapState } from "vuex";
import axios from "axios";

export default {
  metaInfo() {
    return {
      title: "Spotify Clone - " + this.playlist.name
    };
  },
  components: {
    PlaylistItem
  },
  data() {
    return {
      playlist: {},
      color: "#000"
    };
  },
  async beforeRouteEnter(to, from, next) {
    try {
      const data = await getSinglePlaylist(to.params.id);
      const palette = await Vibrant.from(data.image).getPalette();

      next(vm => {
        vm.playlist = data;
        vm.color = palette.Vibrant.hex;
      });
    } catch (e) {
      next(vm => {
        vm.$Progress.fail();
        vm.$router.push({ name: "Home" });
      });
    }
  },
  computed: mapState({
    currentSong: s => s.player.currentSong,
    isPlaying: s => s.player.isPlaying,
    user: s => s.auth.user,
    totalDuration() {
      const total = this.playlist.total_duration;
      const mins = Math.floor(total / 60);
      const secs = total - mins * 60;
      const hrs = Math.floor(total / 3600);
      return `
        ${this.str_pad_left(hrs, "0", 2)}:${this.str_pad_left(
        mins,
        "0",
        2
      )}:${this.str_pad_left(secs, "0", 2)}
      `;
    },
    uppercaseArtist() {
      if (!this.playlist.artist) return "";
      return this.playlist.artist
        .toLowerCase()
        .split(" ")
        .map(name => name[0].toUpperCase() + name.slice(1, name.length))
        .join(" ");
    }
  }),
  methods: {
    async toggleLike() {
      try {
        const { data } = await axios.post(
          "/api/likes/playlists/" + this.playlist.id
        );
        this.$store.dispatch("likes/toggleLike", {
          isLiked: !this.playlist.is_liked,
          playlist: data.playlist
        });
        this.playlist.is_liked = !this.playlist.is_liked;
        this.playlist.likes = this.playlist.is_liked
          ? this.playlist.likes + 1
          : this.playlist.likes - 1;
        this.$toast.success(
          `Playlist ${this.playlist.is_liked ? "liked" : "removed from likes"}`
        );
      } catch (err) {
        console.log(err);
      }
    },
    str_pad_left(string, pad, length) {
      return (new Array(length + 1).join(pad) + string).slice(-length);
    },
    setCurrentSong(song) {
      if (this.currentSong.id === song.id) return;
      this.$store.dispatch("player/setCurrentSong", {
        ...song,
        image: this.playlist.image,
        playlistName: this.playlist.name,
        playlistID: this.playlist.id
      });
      // console.log(this.$store.state.player.currentSong);
    },
    playlistItemClicked(song) {
      if (this.currentSong.id === song.id)
        this.$store.dispatch("player/toggleIsPlaying");
      else this.setCurrentSong(song);
    },
    playSong() {
      if (!this.playlist.songs.length) return;
      if (this.currentSong.playlistID === this.playlist.id)
        this.$store.dispatch("player/toggleIsPlaying");
      else this.setCurrentSong(this.playlist.songs[0]);
    }
  }
};
</script>  

<style lang="scss" scoped>
.playlistPage {
  background-color: rgb(214, 214, 214);
  .mainInner {
    background-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(rgba(0, 0, 0, 0.5)),
      color-stop(40%, #121212)
    );
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), #121212 40%);
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .playlistPageInfo {
    // width: 300px;
    text-align: center;
    padding: 1.5rem 0;
    display: flex;
    .playlistPageImage {
      width: 250px;
      height: 250px;
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        -webkit-box-shadow: 0 4px 60px rgba(0, 0, 0, 0.5);
        box-shadow: 0 4px 60px rgba(0, 0, 0, 0.5);
      }
    }
  }
  .playlistPageSongs {
    height: 100%;
    .playlistButtons {
      display: flex;
      align-items: center;
    }
    .playIcon {
      @extend .playIcon;
      transition: all 0.3s ease-in-out;
      opacity: 1;
      position: relative;
      margin-left: 0;
      height: 56px;
      width: 56px;
      right: 0;
      bottom: 0;
      svg {
        height: 26px;
        width: 26px;
      }

      &:hover {
        transform: scale(1.1);
      }
    }
    .icons {
      .icon {
        margin-left: 1.5rem;
      }
      .iconsHeart {
        width: 28px;
        height: 28px;
        svg {
          fill: $greyText;
          transition: all 0.3s ease-in-out;
        }
        svg.active {
          fill: $greenMain;
        }

        &:hover svg:not(.active) {
          fill: #fff;
        }
      }
    }
  }
  .playlistPageContent {
    text-align: left;
    padding: 1.5rem 2rem;
    h1 {
      font-size: 6rem;
      margin: 0;
      line-height: 1;
      font-family: circular-black;
      letter-spacing: -6px;
    }
    .tagline {
      font-size: 0.9rem;
      opacity: 0.7;
      margin-bottom: 0.5rem;
    }
    .playlistPageDesc {
      display: flex;
      align-items: center;
      font-size: 0.9rem;
      p {
        margin: 0;
      }
      span {
        opacity: 0.7;
        position: relative;
        padding-left: 20px;
        &:before {
          content: "";
          width: 4px;
          height: 4px;
          background: white;
          overflow: hidden;
          border-radius: 50%;
          position: absolute;
          margin-left: -10px;
          top: 9px;
        }
      }
    }
  }
}

ul.songList {
  padding: 0;
  margin: 20px 0;
}
</style>