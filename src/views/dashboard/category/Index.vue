<template>
  <div class="mainInner">
    <div class="nameRow">
      <h1>All Categories</h1>
      <router-link :to="{name: 'Categories.add'}">Add Category</router-link>
    </div>
    <div class="tableWrapper" v-if="data !== null && data.data.length">
      <table>
        <thead>
          <th>#</th>
          <th>Name</th>
          <th>Description</th>
          <th>Playlists</th>
          <th>Actions</th>
        </thead>
        <tbody>
          <tr v-for="category in data.data" :key="category.id">
            <td>{{ category.id }}</td>
            <td>
              <router-link
                :to="{name: 'Category', params: {id: category.id}}"
              >{{20 >= category.name.length ? category.name : category.name.slice(0,20) + '...'}}</router-link>
            </td>
            <td>{{!category.description ? 'None' : 20 >= category.description.length ? category.description : category.description.slice(0,20) + '...'}}</td>
            <td>{{ category.playlists }}</td>
            <td>
              <router-link class="edit" :to="{name: 'Categories.edit', params: {id: category.id}}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477.873 477.873">
                  <path
                    d="M392.533 238.937c-9.426 0-17.067 7.641-17.067 17.067V426.67c0 9.426-7.641 17.067-17.067 17.067H51.2c-9.426 0-17.067-7.641-17.067-17.067V85.337c0-9.426 7.641-17.067 17.067-17.067H256c9.426 0 17.067-7.641 17.067-17.067S265.426 34.137 256 34.137H51.2C22.923 34.137 0 57.06 0 85.337V426.67c0 28.277 22.923 51.2 51.2 51.2h307.2c28.277 0 51.2-22.923 51.2-51.2V256.003c0-9.425-7.641-17.066-17.067-17.066z"
                  />
                  <path
                    d="M458.742 19.142C446.488 6.886 429.867.002 412.536.004c-17.341-.05-33.979 6.846-46.199 19.149L141.534 243.937a17.254 17.254 0 00-4.113 6.673l-34.133 102.4c-2.979 8.943 1.856 18.607 10.799 21.585 1.735.578 3.552.873 5.38.875 1.832-.003 3.653-.297 5.393-.87l102.4-34.133c2.515-.84 4.8-2.254 6.673-4.13l224.802-224.802c25.515-25.512 25.518-66.878.007-92.393zm-24.139 68.277L212.736 309.286l-66.287 22.135 22.067-66.202L390.468 43.353c12.202-12.178 31.967-12.158 44.145.044a31.2148 31.2148 0 019.12 21.955 31.043 31.043 0 01-9.13 22.067z"
                  />
                </svg>
              </router-link>
              <button class="delete" @click="() => deleteItem(category.id)">
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
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <alert v-else msg="No Data" />
  </div>
</template>

<script>
import axios from "axios";
import Alert from "../../../components/Alert.vue";

export default {
  components: { Alert },
  metaInfo() {
    return {
      title: "Spotify Clone - All Categories"
    };
  },
  data() {
    return {
      page: 1,
      data: null,
      loading: false
    };
  },
  async beforeRouteEnter(to, from, next) {
    try {
      const { data } = await axios.get("/api/categories?page=1");
      next(vm => {
        vm.data = data;
      });
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async deleteItem(id) {
      this.$Progress.start();
      try {
        await axios.delete(`/api/categories/${id}`);
        this.data = {
          ...this.data,
          data: [...this.data.data.filter(i => i.id !== id)]
        };
        this.$toast.success("Deleted successfully !");
        this.$Progress.finish();
      } catch (err) {
        console.log(err);
        this.$Progress.fail();
        this.$toast.error("Failed to delete !");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/dashboard";
</style>