<template>
  <div class="bar">
    Bar component
    <p>{{msg}}</p>
    <button @click='fetch'>Fetch Data</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: ""
    };
  },
  methods: {
    fetch() {
      new Promise(() => {
        setTimeout(() => {
          this.msg = "fetch from server";
        }, 1000);
      });
    }
  }
};
</script>

<style scoped>
.bar {
  background-color: yellow;
}
</style>