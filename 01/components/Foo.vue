<template>
  <div>
    Foo component --- {{foo}}
    <button @click="handleFoo()">click</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      foo: "init foo data"
    };
  },
  methods: {
    handleFoo() {
      this.foo = `click method called ${Date.now()}`;
    }
  }
};
</script>

<style scoped>
div {
  padding: 20px;
  border: 2px solid red;
  color: red;
}
</style>