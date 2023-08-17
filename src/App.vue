<template>
  <div id="app">
    <Header></Header>
  
    <router-view></router-view>
    
  </div>
</template>

<script>

import Header from './components/header.vue'
import {getToken} from '@/utils/token'
export default {
  name: 'App',
  components: {
    Header
  },
 
}
</script>

<style>

</style>
