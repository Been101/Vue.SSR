<template>
  <div>
    Bar component {{msg}}
  </div>
</template>

<script>
function fetchData(rootData) {
  rootData.bar.name = "fetch data from db";
}
export default {
  asyncData: fetchData,
  data() {
    return {};
  },
  mounted() {
    fetchData(this.$root.rootData);
  },
  computed: {
    msg() {
      return this.$root.rootData.bar.name;
    }
  }
};
</script>

<style>
</style>