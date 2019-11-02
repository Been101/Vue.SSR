<template>
  <div>
    Bar component --- {{bar}}
    <button @click="handleBar()">click</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bar: "init bar data"
    };
  },
  methods: {
    handleBar() {
      this.bar = `click method called ${Date.now()}`;
    }
  }
};
</script>

<style scoped>
div {
  padding: 20px;
  border: 2px solid green;
  color: green;
}
</style>