<template>
  <div class="musicControls" v-if="currentSong.id">
    <div class="songInfo">
      <img :src="currentSong.image" alt />
      <div>
        <p class="songName">{{ currentSong.name }}</p>
        <p class="playlistName">{{ currentSong.playlistName }}</p>
      </div>
      <div class="like" @click="toggleLike" v-if="user">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          v-if="!songs.find(song => song.id === currentSong.id)"
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
    </div>
    <div class="controls">
      <button @click="togglePlay" v-if="!isPlaying">
        <svg viewBox="0 0 24 24">
          <polygon points="21.57 12 5.98 3 5.98 21 21.57 12" fill="currentColor" />
        </svg>
      </button>
      <button @click="togglePlay" v-else>
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
      </button>
      <div class="timeline">
        <span>{{ playedDurationFormated }}</span>
        <vue-slider
          v-model="playedDuration"
          :width="timeBarWidth"
          :tooltip="'none'"
          :max="currentSong.duration"
          @dragging="val => seek(val)"
          :dragOnClick="false"
          :clickable="false"
        ></vue-slider>
        <span>{{ totalDuration }}</span>
      </div>
    </div>
    <div class="volume">
      <button @click="toggleMute" v-if="volume !== 0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480" fill="currentColor">
          <path
            d="M278.944 17.577c-5.568-2.656-12.128-1.952-16.928 1.92L106.368 144.009H32c-17.632 0-32 14.368-32 32v128c0 17.664 14.368 32 32 32h74.368l155.616 124.512A16.158 16.158 0 00272 464.009c2.368 0 4.736-.544 6.944-1.6a15.968 15.968 0 009.056-14.4v-416a16.05 16.05 0 00-9.056-14.432zM368.992 126.857c-6.304-6.208-16.416-6.112-22.624.128-6.208 6.304-6.144 16.416.128 22.656C370.688 173.513 384 205.609 384 240.009s-13.312 66.496-37.504 90.368c-6.272 6.176-6.336 16.32-.128 22.624a15.943 15.943 0 0011.36 4.736c4.064 0 8.128-1.536 11.264-4.64C399.328 323.241 416 283.049 416 240.009s-16.672-83.232-47.008-113.152z"
          />
          <path
            d="M414.144 81.769c-6.304-6.24-16.416-6.176-22.656.096-6.208 6.272-6.144 16.416.096 22.624C427.968 140.553 448 188.681 448 240.009s-20.032 99.424-56.416 135.488c-6.24 6.24-6.304 16.384-.096 22.656 3.168 3.136 7.264 4.704 11.36 4.704 4.064 0 8.16-1.536 11.296-4.64C456.64 356.137 480 299.945 480 240.009s-23.36-116.128-65.856-158.24z"
          />
        </svg>
      </button>
      <button @click="toggleMute" v-else>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448.075 448.075" fill="currentColor">
          <path
            d="M352.021 16.075c0-6.08-3.52-11.84-8.96-14.4-5.76-2.88-12.16-1.92-16.96 1.92l-141.76 112.96 167.68 167.68V16.075zM443.349 420.747l-416-416c-6.24-6.24-16.384-6.24-22.624 0s-6.24 16.384 0 22.624l100.672 100.704h-9.376c-9.92 0-18.56 4.48-24.32 11.52-4.8 5.44-7.68 12.8-7.68 20.48v128c0 17.6 14.4 32 32 32h74.24l155.84 124.48c2.88 2.24 6.4 3.52 9.92 3.52 2.24 0 4.8-.64 7.04-1.6 5.44-2.56 8.96-8.32 8.96-14.4v-57.376l68.672 68.672c3.136 3.136 7.232 4.704 11.328 4.704s8.192-1.568 11.328-4.672c6.24-6.272 6.24-16.384 0-22.656z"
          />
        </svg>
      </button>
      <vue-slider
        v-model="volume"
        :width="100"
        :tooltip="'none'"
        :max="20"
        @dragging="val => moveVolume(val)"
        :dragOnClick="false"
        :clickable="false"
      ></vue-slider>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import { Howl } from "howler";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";

export default {
  components: {
    VueSlider
  },
  data() {
    return {
      sound: null,
      playedDuration: 0,
      timeBarWidth: 450,
      volume: 20,
      previousVolume: 20
    };
  },
  mounted() {
    this.sound = new Howl({
      src: [this.currentSong.song_path],
      autoplay: true,
      onplay: () => {
        requestAnimationFrame(this.step);
      },
      onend: () => {
        this.$store.dispatch("player/toggleIsPlaying", false);
        this.playedDuration = 0;
      }
    });
  },
  computed: mapState({
    currentSong: s => s.player.currentSong,
    isPlaying: s => s.player.isPlaying,
    songs: s => (s.likes.likes ? s.likes.likes.songs : []),
    user: s => s.auth.user,
    totalDuration() {
      const total = this.currentSong.duration;
      const mins = Math.floor(total / 60);
      const secs = total - mins * 60;
      return `${this.str_pad_left(mins, "0", 2)}:${this.str_pad_left(
        secs,
        "0",
        2
      )}
      `;
    },
    playedDurationFormated() {
      const total = this.playedDuration;
      const mins = Math.floor(total / 60);
      const secs = total - mins * 60;
      return `${this.str_pad_left(mins, "0", 2)}:${this.str_pad_left(
        secs,
        "0",
        2
      )}
      `;
    }
  }),
  watch: {
    currentSong() {
      this.sound !== null && this.sound.stop();
      this.$store.dispatch("player/toggleIsPlaying", true);
      this.playedDuration = 0;
      this.sound = new Howl({
        src: [this.currentSong.song_path],
        autoplay: true,
        volume: this.volume / 20,
        onplay: () => {
          requestAnimationFrame(this.step);
        },
        onend: () => {
          this.$store.dispatch("player/toggleIsPlaying", false);
          this.playedDuration = 0;
        }
      });
    },
    isPlaying() {
      this.isPlaying ? this.sound.play() : this.sound.pause();
    }
  },
  methods: {
    async toggleLike() {
      const isLiked = !this.songs.find(song => song.id === this.currentSong.id);
      try {
        // eslint-disable-next-line no-unused-vars
        const { data } = await axios.post(
          "/api/likes/songs/" + this.currentSong.id
        );
        this.$store.dispatch("likes/toggleLikeSong", {
          isLiked,
          song: data.song
        });
        this.$toast.success(`Song ${isLiked ? "liked" : "removed from likes"}`);
      } catch (err) {
        console.log(err);
      }
    },
    togglePlay() {
      this.$store.dispatch("player/toggleIsPlaying");
      // this.isPlaying ? this.sound.play() : this.sound.pause();
    },
    moveVolume(volume) {
      this.sound.volume(volume / 20);
      this.volume = volume;
    },
    toggleMute() {
      if (this.volume !== 0) this.previousVolume = this.volume;
      this.sound.volume(this.volume !== 0 ? 0 : this.previousVolume / 20);
      this.volume = this.volume !== 0 ? 0 : this.previousVolume;
    },
    str_pad_left(string, pad, length) {
      return (new Array(length + 1).join(pad) + string).slice(-length);
    },
    seek(val) {
      this.sound.seek(val);
    },
    step() {
      let sound = this.sound;
      let seek = sound.seek() || 0;
      this.playedDuration = Math.floor(!Number.isNaN(seek) ? seek : 0);
      if (this.isPlaying) requestAnimationFrame(this.step);
    }
  }
};
</script>

<style lang="scss">
$sliderBG: #535353;
$activeSlider: #b3b3b3;

.vue-slider-process {
  background: $activeSlider;
}

.vue-slider-dot-handle {
  border: none;
  opacity: 0;
}

.vue-slider:hover .vue-slider-dot-handle,
.vue-slider-dot-handle:hover,
.vue-slider-dot-handle:focus,
.vue-slider-dot-handle-focus {
  opacity: 1;
}

.vue-slider-dot-handle-focus {
  box-shadow: none;
}

.vue-slider:hover .vue-slider-process,
.vue-slider:focus .vue-slider-process ~ .vue-slider-dot-handle-focus {
  background: $greenMain;
}

.vue-slider-dot {
  border: none;
}

.vue-slider-rail,
.vue-slider:hover .vue-slider-rail {
  background: $sliderBG;
}

.musicControls {
  background: $greyLighter;
  text-align: center;
  padding: 0 16px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  z-index: 2;
  position: relative;
  border-top: 1px solid $greyDark;
  .songInfo {
    display: flex;
    align-items: center;
    text-align: left;
    img {
      width: 56px;
      height: 56px;
    }
    div {
      margin: 0 14px;
    }

    .songName {
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.015em;
      color: #fff;
      text-align: left;
    }

    .playlistName {
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.015em;
      color: #fff;
      text-align: left;
      color: $greyText;
    }
    .like {
      svg {
        width: 14px;
        fill: #fff;
      }

      svg.active {
        fill: $greenMain;
      }
    }
  }
  .controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
      transition: 0.2s ease;
      border: none;
      background: transparent;
      outline: none;
      cursor: pointer;
      color: $greyText;
      border: 1px solid $greyText;
      border-radius: 50%;
      width: 35px;
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        color: #fff;
        border-color: #fff;
      }
      svg {
        width: 20px;
        height: 20px;
        &.pause {
          width: 16px;
          height: 16px;
        }
      }
    }
    .timeline {
      margin-top: 10px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .vue-slider {
        width: 150px;
        margin: 0 15px;
      }
      & > span {
        font-size: 11px;
        font-weight: 400;
        line-height: 16px;
        letter-spacing: normal;
        text-transform: none;
      }
    }
  }
  .volume {
    display: flex;
    align-items: center;
    width: 140px;
    button {
      transition: 0.2s ease;
      border: none;
      background: transparent;
      margin-right: 14px;
      outline: none;
      cursor: pointer;
      color: $greyText;
      &:hover {
        color: #fff;
      }
      svg {
        width: 15px;
        height: 15px;
      }
    }
  }
}
</style>