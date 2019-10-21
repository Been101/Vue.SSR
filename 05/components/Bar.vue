<template>
  <div>
    Bar component {{msg}}
  </div>
</template>

<script>
function fetchData(store) {
  store.dispatch("fetchBar");
}
export default {
  asyncData: fetchData,
  data() {
    return {};
  },
  mounted() {
    const store = this.$store;
    fetchData(store);
  },
  computed: {
    msg() {
      return this.$store.state.bar;
    }
  }
};
</script>

<style>
</style>