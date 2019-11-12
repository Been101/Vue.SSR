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
    // 初始路由是 /bar 时才会触发这个函数进行初始化数据
    return store.dispatch("fetchItem", 1);
  },
  data() {
    return {
      msg: ""
    };
  },
  mounted() {
    // 初始页面不是该页面时，客户端需要在路由切换到这个组件时获取数据
    this.$store.dispatch("fetchItem", 1);
    this.$store.dispatch("fetchItem", 0);
  },
  computed: {
    item() {
      return this.$store.state.items[1];
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