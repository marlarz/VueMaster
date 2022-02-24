<template>
  <section class="text-gray-400 bg-gray-900 body-font">
    <div class="container px-5 py-12 mx-auto flex flex-wrap">
      <slot name="header"></slot>
      <div class="w-full"
           :class="{ 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : grid }">
        <slot name="body"></slot>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Container',
  props: {
    grid: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>

</style>
