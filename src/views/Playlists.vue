<template>
  <div class="playlistPage">
    <div class="mainInner">
      <div class="playlistPageInfo">
        <div class="playlistPageImage">
          <img :src="playlist.image" :alt="`${playlist.name} picture`" />
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
          <span class="playIcon">
            <svg height="16" role="img" width="16" viewBox="0 0 24 24">
              <polygon points="21.57 12 5.98 3 5.98 21 21.57 12" fill="currentColor" />
            </svg>
          </span>
          <div class="icons">
            <div class="icon iconsHeart">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  d="M378.667 21.333c-56.792 0-103.698 52.75-122.667 77.646-18.969-24.896-65.875-77.646-122.667-77.646C59.813 21.333 0 88.927 0 172c0 45.323 17.99 87.562 49.479 116.469a10.54 10.54 0 001.677 2.177l197.313 196.906c2.083 2.073 4.802 3.115 7.531 3.115s5.458-1.042 7.542-3.125L467.417 283.74l2.104-2.042c1.667-1.573 3.313-3.167 5.156-5.208a10.372 10.372 0 001.896-2.542C499.438 245.948 512 209.833 512 172c0-83.073-59.812-150.667-133.333-150.667zm80.156 240.615a9.929 9.929 0 00-.802 1.083c-1 1.146-2.094 2.156-3.177 3.188L255.99 464.927 68.667 277.979a10.706 10.706 0 00-2.479-3.177C37.677 249.906 21.333 212.437 21.333 172c0-71.313 50.24-129.333 112-129.333 61.063 0 113.177 79.646 113.698 80.448 3.938 6.083 14 6.083 17.938 0 .521-.802 52.635-80.448 113.698-80.448 61.76 0 112 58.021 112 129.333 0 33.604-11.313 65.552-31.844 89.948z"
                />
              </svg>
            </div>
            <div class="icon iconsDots"></div>
          </div>
        </div>

        <ul class="songList" v-for="song in playlist.songs" :key="song.id">
          <playlist-item
            :click="() => setCurrentSong(song, playlist.image, song.artist ? song.artist : playlist.artist)"
            :song="song"
            :artist="song.artist ? song.artist : playlist.artist"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import PlaylistItem from "../components/PlaylistItem.vue";
import { getSinglePlaylist } from "../api/playlists";
export default {
  components: {
    PlaylistItem
  },
  data() {
    return {
      playlist: {}
    };
  },
  async beforeRouteEnter(to, from, next) {
    try {
      const data = await getSinglePlaylist(to.params.id);
      next(vm => {
        vm.playlist = data;
      });
    } catch (e) {
      next(vm => {
        vm.$Progress.fail();
        vm.$router.push({ name: "Home" });
      });
    }
  },
  computed: {
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
  },
  methods: {
    str_pad_left(string, pad, length) {
      return (new Array(length + 1).join(pad) + string).slice(-length);
    },
    setCurrentSong(song, image) {
      if (this.$store.state.player.currentSong.id === song.id) return;
      this.$store.dispatch("player/setCurrentSong", {
        ...song,
        image,
        playlistName: this.playlist.name
      });
      // console.log(this.$store.state.player.currentSong);
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
        &:hover svg {
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