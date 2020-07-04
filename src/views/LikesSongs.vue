<template>
  <div class="playlistPage" :style="{backgroundImage: `linear-gradient(${color}, #121212 40%)`}">
    <div class="mainInner">
      <div class="playlistPageInfo">
        <div class="playlistPageImage">
          <img
            loading="lazy"
            src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
            :alt="`liked songs picture`"
          />
        </div>
        <div class="playlistPageContent">
          <p class="smallText uppercase bold">Playlist</p>
          <h1>Liked Songs</h1>

          <p class="tagline">Your favorite songs</p>
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
              v-if="isPlaying && songs.find(song => song.id === currentSong.id)"
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
        </div>

        <ul class="songList" v-for="song in songs" :key="song.id">
          <playlist-item
            :click="() => playlistItemClicked(song, song.playlist.image)"
            :song="song"
            :artist="song.artist ? song.artist : song.playlist.artist"
            :isActive="song.id === currentSong.id"
            :isPlaying="song.id === currentSong.id && isPlaying"
          />
        </ul>

        <alert v-if="!songs.length" msg="You didn't like any song yet !" />
      </div>
    </div>
  </div>
</template>

<script>
import PlaylistItem from "../components/PlaylistItem.vue";
import Alert from "../components/Alert.vue";
import { mapState } from "vuex";

export default {
  metaInfo() {
    return {
      title: "Spotify Clone - Liked Songs"
    };
  },
  components: {
    PlaylistItem,
    Alert
  },
  data() {
    return {
      color: "#4B2CAC"
    };
  },
  computed: mapState({
    currentSong: s => s.player.currentSong,
    isPlaying: s => s.player.isPlaying,
    user: s => s.auth.user,
    songs: s => s.likes.likes.songs
  }),
  watch: {
    user() {
      if (!this.user) this.$router.push({ name: "Home" });
    }
  },
  methods: {
    str_pad_left(string, pad, length) {
      return (new Array(length + 1).join(pad) + string).slice(-length);
    },
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
    playlistItemClicked(song) {
      if (this.currentSong.id === song.id)
        this.$store.dispatch("player/toggleIsPlaying");
      else this.setCurrentSong(song);
    },
    playSong() {
      if (!this.songs.length) return;
      if (
        this.songs.find(
          song => song.playlist.id === this.currentSong.playlistID
        )
      )
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