<template>
  <div class="flex flex-col text-center w-full mb-12">
    <h2 class="text-xs text-indigo-400 tracking-widest font-medium title-font mb-1">
      {{ subtitle }}
    </h2>
    <h1 class="sm:text-3xl text-2xl font-medium title-font text-white">
      {{ title }}
    </h1>
  </div>
</template>

<script>
export default {
  name: 'ContainerTitle',
  props: {
    title: {

    },
    subtitle: {

    },
  },
};
</script>

<style scoped>

</style>
