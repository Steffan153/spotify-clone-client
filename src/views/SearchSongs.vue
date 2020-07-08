<template>
  <div class="mainInner">
    <h1>Showing song results for "{{ this.term }}"</h1>
    <alert v-if="songs && !songs.total" msg="No songs !" />
    <div
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <div v-if="songs">
        <ul class="songList" v-for="song in songs.data" :key="song.id">
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
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import Alert from "../components/Alert.vue";

export default {
  data() {
    return {
      page: 1,
      loading: false,
      songs: { data: [] }
    };
  },
  metaInfo() {
    return {
      title: "Spotify Clone - Search Songs"
    };
  },
  components: { Alert },
  computed: mapState({
    searchSongs: s => s.search.songs,
    term: s => s.search.term,
    currentSong: s => s.player.currentSong,
    isPlaying: s => s.player.isPlaying
  }),
  watch: {
    searchSongs() {
      this.songs = this.searchSongs;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.$store.state.search.term) vm.$router.push({ name: "Search" });
      else vm.songs = vm.searchSongs;
    });
  },
  methods: {
    setCurrentSong(song) {
      if (this.currentSong.id === song.id) return;
      this.$store.dispatch("player/setCurrentSong", {
        ...song,
        image: song.playlist.image_path,
        playlistName: song.playlist.name,
        playlistID: song.playlist.id,
        song_path: song.song
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
    async loadMore() {
      if (
        this.songs &&
        this.songs.last_page === this.songs.current_page &&
        !this.loading
      )
        this.loading = true;
      else {
        this.loading = true;
        try {
          const { data } = await axios.get(
            `/api/search/songs?q=${this.term}&page=${this.page}`
          );

          const prevData = this.songs ? this.songs.data : [];
          this.$store.dispatch("search/saveSearchSongs", {
            ...data,
            data: [...prevData, ...data.data]
          });
          this.page++;
          this.loading = false;
        } catch (err) {
          console.log(err);
        }
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
  &.active {
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
}
</style>