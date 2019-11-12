<template>
  <div>
    Foo component --- {{fooItem}}
  </div>
</template>

<script>
export default {
  name: "Foo",
  computed: {
    fooItem() {
      return this.$store.state.items[0];
    }
  }
};
</script>

<style>
</style>