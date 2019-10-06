<template>
    <div id = 'app'>
        <bar />
        <foo />
    </div>
</template>

<script>
import Bar from './components/Bar.vue'
import Foo from './components/Foo.vue'
export default {
  name:'',
  components: { Bar, Foo},
  data(){
   return {

   }
  }
}
</script>

<style scoped>

</style>
