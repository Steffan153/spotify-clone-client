<template>
  <li @click="click">
    <div class="songIcon">
      <svg class="noteI" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          d="M334.938 102.697c-30.917-24.154-57.604-45.007-57.604-91.999C277.333 4.785 272.563 0 266.667 0S256 4.785 256 10.698v351.53c0 11.805-9.563 21.396-21.333 21.396H192c-47.063 0-85.333 28.793-85.333 64.188S144.937 512 192 512s85.333-28.793 85.333-64.188V77.853c12.349 16.53 28.538 29.241 44.5 41.706C353.792 144.548 384 168.138 384 223.154c0 5.913 4.771 10.698 10.667 10.698s10.667-4.785 10.667-10.698c-.001-65.463-37.396-94.694-70.396-120.457zM256 447.812c0 23.193-29.313 42.792-64 42.792s-64-19.599-64-42.792 29.313-42.792 64-42.792h42.667A42.214 42.214 0 00256 399.274v48.538z"
        />
      </svg>
      <svg class="playI" viewBox="0 0 85 100">
        <path
          fill="currentColor"
          d="M81 44.6c5 3 5 7.8 0 10.8L9 98.7c-5 3-9 .7-9-5V6.3c0-5.7 4-8 9-5l72 43.3z"
        >
          <title>PLAY</title>
        </path>
      </svg>
    </div>
    <div class="songDetails">
      <h3>{{ song.name }}</h3>
      <span>{{ uppercaseArtist }}</span>
    </div>
    <div class="songTime">
      <span>{{ totalDuration }}</span>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    song: Object,
    artist: String,
    click: Function
  },
  computed: {
    totalDuration() {
      const total = this.song.duration;
      const mins = Math.floor(total / 60);
      const secs = total - mins * 60;
      return `${this.str_pad_left(mins, "0", 2)}:${this.str_pad_left(
        secs,
        "0",
        2
      )}`;
    },
    uppercaseArtist() {
      return this.artist
        .toLowerCase()
        .split(" ")
        .map(name => name[0].toUpperCase() + name.slice(1, name.length))
        .join(" ");
    }
  },
  methods: {
    str_pad_left(string, pad, length) {
      return (new Array(length + 1).join(pad) + string).slice(-length);
    }
  }
};
</script>

<style lang="scss" scoped>
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
      .noteI {
        display: none;
      }
      .playI {
        display: block;
      }
    }
  }
  .songDetails {
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
    padding-right: 1rem;
    .playI {
      display: none;
    }
    svg {
      fill: rgba(255, 255, 255, 0.7);
      width: 15px;
      height: 15px;
    }
  }
}
</style>