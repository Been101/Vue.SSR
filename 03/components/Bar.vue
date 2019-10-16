<template>
  <div>
    Bar component {{msg}}
  </div>
</template>

<script>
const rootData = {
  bar: {
    name: ""
  }
};
function fetchData() {
  return new Promise((resolve, reject) => {
    rootData.bar.name = "fetch data from db";
    resolve("fetch data from db");
  });
}
export default {
  asyncData: fetchData,
  data() {
    return {};
  },
  mounted() {
    fetchData().then(res => {
      rootData.bar.name = res;
    });
  },
  computed: {
    msg() {
      return rootData.bar.name;
    }
  }
};
</script>

<style>
</style>