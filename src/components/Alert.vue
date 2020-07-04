<template>
  <div class="errorAlert">
    <p>{{ this.msg }}</p>
  </div>
</template>

<script>
export default {
  props: {
    msg: String
  }
};
</script>

<style lang="scss">
.errorAlert {
  width: 100%;
  margin: 10px 0;
  background: red;
  color: white;
  border-radius: 4px;
  padding: 12px 20px;
}
</style>