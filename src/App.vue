<template>
  <div class="bg-gray-900 min-h-screen flex flex-col flex-auto flex-shrink-0
  antialiased text-white">
    <Header></Header>
    <router-view/>
  </div>
</template>
<script>
import Header from './components/Header.vue';

export default {
  components: { Header },
};
</script>
