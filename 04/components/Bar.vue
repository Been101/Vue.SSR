<template>
  <div class="bar">
    Bar component --- {{item}}
    <p>{{msg}}</p>
    <button @click='fetch'>Fetch Data</button>
  </div>
</template>

<script>
export default {
  name: "Bar",
  asyncData({ store, route }) {
    return store.dispatch("fetchItem", route.params.id);
  },
  data() {
    return {
      msg: ""
    };
  },
  computed: {
    item() {
      return this.$store.state.items[this.$route.params.id];
    }
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