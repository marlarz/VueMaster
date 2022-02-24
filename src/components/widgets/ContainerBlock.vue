<template>
  <router-link :to="{ name: 'Course', params: { id: 1 }}"
               custom v-slot="{ href, navigate }">
    <a :href="href" @click="navigate">
    <div class="rounded-lg h-full bg-gray-800 bg-opacity-60 hover:bg-opacity-90 p-8 cursor-pointer">
      <div class="flex items-center mb-3">
        <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full
        bg-green-600 text-white flex-shrink-0">
          <CodeIcon class="block h-5 w-5"></CodeIcon>
        </div>
        <h2 class="text-white text-lg title-font font-medium">{{ title }}</h2>
      </div>
      <div class="flex-grow">
        <p class="leading-relaxed text-base">{{ description }}</p>
      </div>
    </div>
    </a>
  </router-link>
</template>

<script>
import { CodeIcon } from '@heroicons/vue/solid';

export default {
  name: 'ContainerBlock',
  components: {
    CodeIcon,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>

</style>
