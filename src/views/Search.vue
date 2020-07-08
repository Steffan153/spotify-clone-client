<template>
  <div class="mainInner" ref="mainInnerRef">
    <h1>Search</h1>
    <form class="searchForm" @submit.prevent="search">
      <svg viewBox="0 0 512 512" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z"
          fill="currentColor"
          fill-rule="evenodd"
        />
      </svg>
      <input type="text" placeholder="Search" v-model="searchTerm" />
    </form>
    <div class="content">
      <p v-if="loading">Loading...</p>
      <div class="results" v-if="data">
        <div class="cardsWrap">
          <div class="nameRow">
            <h2>Songs</h2>
            <router-link :to="{name: 'SearchSongs'}">see all</router-link>
          </div>
          <div v-if="data.songs.length">
            <ul class="songList" v-for="song in data.songs" :key="song.id">
              <li @click="() => songClicked(song)" :class="{active: song.id === currentSong.id}">
                <div class="songIcon">
                  <img :src="song.playlist.image_path" />
                  <svg
                    class="playI"
                    viewBox="0 0 85 100"
                    v-if="!(song.id === currentSong.id && isPlaying)"
                  >
                    <path
                      fill="currentColor"
                      d="M81 44.6c5 3 5 7.8 0 10.8L9 98.7c-5 3-9 .7-9-5V6.3c0-5.7 4-8 9-5l72 43.3z"
                    >
                      <title>PLAY</title>
                    </path>
                  </svg>
                  <svg class="playI" height="16" role="img" width="16" viewBox="0 0 24 24" v-else>
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
                </div>
                <div class="songDetails">
                  <h3>{{ song.name }}</h3>
                  <span>{{ uppercaseArtist(song.artist ? song.artist : song.playlist.artist) }}</span>
                </div>
                <div class="songTime">
                  <span>{{ totalDuration(song.duration) }}</span>
                </div>
              </li>
            </ul>
          </div>
          <alert v-else msg="No songs !" />
        </div>

        <div class="cardsWrap">
          <div class="nameRow">
            <h2>Playlists</h2>
            <router-link :to="{name: 'SearchPlaylists'}">see all</router-link>
          </div>
          <playlist-section
            v-if="data.playlists.length"
            :playlists="data.playlists"
            :limiter="limiter"
          />
          <alert v-else msg="No playlists !" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PlaylistSection from "../components/PlaylistSection.vue";
import Alert from "../components/Alert.vue";
import { mapState } from "vuex";

export default {
  components: { PlaylistSection, Alert },
  data() {
    return {
      searchTerm: "",
      loading: false,
      limiter: 0
    };
  },
  computed: mapState({
    data: s => s.search.data,
    searchedTerm: s => s.search.term,
    currentSong: s => s.player.currentSong,
    isPlaying: s => s.player.isPlaying
  }),
  metaInfo() {
    return {
      title: "Spotify Clone - Search"
    };
  },
  mounted() {
    this.searchTerm = this.searchedTerm;
    this.handleWindowResize();
    window.addEventListener("resize", this.handleWindowResize);
  },
  methods: {
    setCurrentSong(song) {
      if (this.currentSong.id === song.id) return;
      this.$store.dispatch("player/setCurrentSong", {
        ...song,
        image: song.playlist.image_path,
        playlistName: song.playlist.name,
        playlistID: song.playlist.id
      });
      // console.log(this.$store.state.player.currentSong);
    },
    songClicked(song) {
      if (this.currentSong.id === song.id)
        this.$store.dispatch("player/toggleIsPlaying");
      else this.setCurrentSong(song);
    },
    totalDuration(duration) {
      const total = duration;
      const mins = Math.floor(total / 60);
      const secs = total - mins * 60;
      return `${this.str_pad_left(mins, "0", 2)}:${this.str_pad_left(
        secs,
        "0",
        2
      )}`;
    },
    uppercaseArtist(artist) {
      return artist
        .toLowerCase()
        .split(" ")
        .map(name => name[0].toUpperCase() + name.slice(1, name.length))
        .join(" ");
    },
    str_pad_left(string, pad, length) {
      return (new Array(length + 1).join(pad) + string).slice(-length);
    },
    handleWindowResize() {
      if (!this.$refs["mainInnerRef"]) return;
      const calculation = Math.floor(
        this.$refs["mainInnerRef"].getBoundingClientRect().width / 195
      );

      this.limiter = calculation;
    },
    async search() {
      this.loading = true;
      const term = this.searchTerm;
      try {
        const { data } = await axios.get(`/api/search?q=${term}`);
        this.$store.dispatch("search/saveSearch", { data, term });
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>


<style lang="scss" scoped>
h1 {
  margin: 20px 0;
}
li {
  list-style-type: none;
  cursor: pointer;
  width: 100%;
  padding: 0.8rem;
  display: flex;
  align-items: center;
  transition: background 0.2s ease-in-out;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    .songIcon {
      img {
        filter: brightness(40%);
      }
      .playI {
        display: block;
      }
    }
  }
  .songDetails {
    margin-left: 15px;
    h3 {
      margin: 0;
      font-weight: 300;
      font-size: 1rem;
    }
    span {
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.9rem;
    }
  }
  .songTime {
    margin-left: auto;
  }
  .songIcon {
    // padding-right: 1rem;
    position: relative;
    img {
      width: 45px;
      height: 45px;
      position: relative;
    }

    .playI {
      display: none;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    svg {
      fill: rgba(255, 255, 255, 0.7);
      width: 15px;
      height: 15px;
    }
  }
}

li.active {
  color: $greenMain;
  .songDetails {
    span {
      color: $greenMain;
    }
  }
  .songIcon {
    svg {
      fill: $greenMain;
    }
  }
}

.nameRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    color: #fff;
    text-transform: uppercase;
    text-decoration: none;
    border-bottom: 2px solid transparent;
    font-size: 14px;
    color: $greyText;
    &:hover {
      color: #fff;
      border-color: #fff;
    }
  }
  margin: 10px 0;
}

.searchForm {
  position: relative;
  width: 300px;
  svg {
    color: #000;
    position: absolute;
    margin-top: 4px;
    margin-left: 8px;
  }
  input {
    font-size: 16px;
    width: 100%;
    background: #fff;
    color: #000;
    font-family: inherit;
    border-radius: 15px;
    border: none;
    outline: none;
    padding: 8px 30px;
    padding-left: 40px;
  }
}

.content {
  margin: 30px 0;
}
</style>