<template>
  <div class="mainInner">
    <div class="topHeader">
      <div class="profileIcon">
        <svg
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 18 20"
          xmlns="http://www.w3.org/2000/svg"
          data-testid="user-icon"
        >
          <path
            d="M15.216 13.717L12 11.869C11.823 11.768 11.772 11.607 11.757 11.521C11.742 11.435 11.737 11.267 11.869 11.111L13.18 9.57401C14.031 8.58001 14.5 7.31101 14.5 6.00001V5.50001C14.5 3.98501 13.866 2.52301 12.761 1.48601C11.64 0.435011 10.173 -0.0879888 8.636 0.0110112C5.756 0.198011 3.501 2.68401 3.501 5.67101V6.00001C3.501 7.31101 3.97 8.58001 4.82 9.57401L6.131 11.111C6.264 11.266 6.258 11.434 6.243 11.521C6.228 11.607 6.177 11.768 5.999 11.869L2.786 13.716C1.067 14.692 0 16.526 0 18.501V20H1V18.501C1 16.885 1.874 15.385 3.283 14.584L6.498 12.736C6.886 12.513 7.152 12.132 7.228 11.691C7.304 11.251 7.182 10.802 6.891 10.462L5.579 8.92501C4.883 8.11101 4.499 7.07201 4.499 6.00001V5.67101C4.499 3.21001 6.344 1.16201 8.699 1.00901C9.961 0.928011 11.159 1.35601 12.076 2.21501C12.994 3.07601 13.5 4.24301 13.5 5.50001V6.00001C13.5 7.07201 13.117 8.11101 12.42 8.92501L11.109 10.462C10.819 10.803 10.696 11.251 10.772 11.691C10.849 12.132 11.115 12.513 11.503 12.736L14.721 14.585C16.127 15.384 17.001 16.884 17.001 18.501V20H18.001V18.501C18 16.526 16.932 14.692 15.216 13.717Z"
          />
        </svg>
      </div>
      <div class="profileText">
        <p class="profileLabel">profile</p>
        <h1>{{ user.name }}</h1>
      </div>
    </div>
    <div class="profileFormsGroup">
      <form class="profileForm" @submit.prevent="updateData">
        <input type="text" placeholder="Name" v-model="name" />
        <span class="errorMsg" v-if="errors.name">{{ errors.name }}</span>
        <input type="text" placeholder="Email" v-model="email" />
        <span class="errorMsg" v-if="errors.email">{{ errors.email }}</span>
        <button type="submit">Save</button>
      </form>

      <form class="profileForm" @submit.prevent="updatePassword">
        <input type="password" placeholder="Old Password" v-model="oldPassword" />
        <span class="errorMsg" v-if="errors.oldPassword">{{ errors.oldPassword }}</span>
        <input type="password" placeholder="New Password" v-model="newPassword" />
        <span class="errorMsg" v-if="errors.newPassword">{{ errors.newPassword }}</span>
        <button type="submit">Update Password</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  metaInfo() {
    return {
      title: "Spotify Clone - Profile"
    };
  },
  data() {
    return {
      name: "",
      email: "",
      oldPassword: "",
      newPassword: "",
      errors: {
        name: "",
        email: "",
        oldPassword: "",
        newPassword: ""
      }
    };
  },
  mounted() {
    this.name = this.user.name;
    this.email = this.user.email;
  },
  computed: {
    ...mapState({
      user: s => s.auth.user
    })
  },
  methods: {
    async updateData() {
      if (!this.name) {
        this.errors = { ...this.errors, name: "Name is required !" };
      } else {
        this.errors = { ...this.errors, name: "" };
      }

      if (!this.email) {
        this.errors = { ...this.errors, email: "Email is required !" };
      } else {
        this.errors = { ...this.errors, email: "" };
      }

      if (!this.name || !this.email) return;
      this.$Progress.start();
      try {
        // eslint-disable-next-line no-unused-vars
        const { data } = await axios.put("/api/auth/updateUserDetails", {
          name: this.name,
          email: this.email
        });
        this.$store.dispatch("auth/updateUser", {
          name: this.name,
          email: this.email
        });
        this.errors = { ...this.errors, name: "", email: "" };
        this.$toast.success("Profile saved");
        this.$Progress.finish();
      } catch (err) {
        console.log(err.response.data);
        this.errors = {
          ...this.errors,
          name: err.response.data.errors.name?.[0],
          email: err.response.data.errors.email?.[0]
        };
        this.$Progress.fail();
      }
    },
    async updatePassword() {
      if (!this.oldPassword) {
        this.errors = {
          ...this.errors,
          oldPassword: "Old password is required !"
        };
      } else {
        this.errors = { ...this.errors, oldPassword: "" };
      }

      if (!this.newPassword) {
        this.errors = {
          ...this.errors,
          newPassword: "New password is required !"
        };
      } else {
        this.errors = { ...this.errors, newPassword: "" };
      }

      if (!this.oldPassword || !this.newPassword) return;
      this.$Progress.start();
      try {
        // eslint-disable-next-line no-unused-vars
        const { data } = await axios.put("/api/auth/updateUserPassword", {
          old_password: this.oldPassword,
          password: this.newPassword
        });
        this.errors = { ...this.errors, oldPassword: "", newPassword: "" };
        this.$toast.success("Profile saved");
        this.$Progress.finish();
      } catch (err) {
        console.log(err.response);
        this.$Progress.fail();
        this.errors = {
          ...this.errors,
          oldPassword: err.response.data.message
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.topHeader {
  display: flex;
  align-items: center;
  .profileIcon {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    color: #7f7f7f;
    background: $greyLighter;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      fill: #7f7f7f;
      width: 30px;
      height: 30px;
    }
  }
  .profileText {
    margin-left: 20px;
    .profileLabel {
      text-transform: uppercase;
      font-size: 10px;
      margin-bottom: 5px;
    }
    h1 {
      font-size: 50px;
    }
  }
}

.profileFormsGroup {
  margin: 40px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 40px;
  .profileForm {
    background: $greyLighter;
    padding: 20px;
    border-radius: 4px;
    input {
      display: block;
      width: 100%;
      outline: none;
      background: $greyLight;
      border: none;
      font-family: inherit;
      border-radius: 4px;
      color: #fff;
      margin-bottom: 30px;
      padding: 9px 20px;
      &:last-of-type {
        margin-bottom: 0;
      }

      &:last-of-type ~ .errorMsg {
        margin-top: 0px;
      }
    }
    .errorMsg {
      display: block;
      color: red;
      margin-top: -27px;
      margin-bottom: 10px;
      font-size: 13px;
    }
    button {
      width: auto;
      padding: 7px 20px;
      margin-top: 20px;
      cursor: pointer;
      background: $greenMain;
      border: none;
      border-radius: 4px;
      color: #fff;
      font-family: inherit;
      outline: none;
      &:hover {
        background: darken($color: $greenMain, $amount: 5);
      }
    }
  }
}
</style>