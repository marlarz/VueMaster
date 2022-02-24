<template>
  <section class="text-gray-400 body-font">
    <div class="container px-5 py-5 md:py-12 mx-auto flex flex-wrap items-center
    w-full md:w-1/2 lg:w-1/3 xl:w-1/4 max-w-lg">
      <div class="bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col w-full">
        <h2 class="text-white text-lg font-medium title-font mb-4">Zaloguj się</h2>
        <div class="relative mb-4">
          <label for="full-name" class="leading-7 text-sm text-gray-400">Email</label>
          <input type="email" id="full-name" name="full-name" v-model="identifier"
                 class="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent
                 focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600
                 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3
                 leading-8 transition-colors duration-200 ease-in-out">
        </div>
        <div class="relative mb-4">
          <label for="email" class="leading-7 text-sm text-gray-400">Hasło</label>
          <input v-model="password" type="password" id="email" name="email"
                 class="w-full bg-gray-600 bg-opacity-20
          focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600
          focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8
          transition-colors duration-200 ease-in-out">
        </div>
        <p v-if="isError" class="-mt-1 mb-3 text-red-400 text-sm">
          Błędny login lub hasło.
        </p>
        <button @click="login" class="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none
        hover:bg-blue-600 rounded text-lg inline-flex items-center
        border-transparent justify-center disabled:opacity-70"
                :disabled="getLoader">
          <SupportIcon v-if="getLoader" class="animate-spin h-5 w-5 -ml-5"></SupportIcon>
          Zaloguj
        </button>
        <p class="text-base mt-8 text-center">
          <a href="#" class="text-blue-500 hover:text-blue-600">Utwórz nowe konto</a>
        </p>
        <p class="text-xs mt-3 text-center">
          <a href="#" class="text-blue-500 hover:text-blue-600">Odzyskaj hasło.</a>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { SupportIcon } from '@heroicons/vue/solid';

import { createHelpers } from 'vuex-map-fields';

const { mapFields } = createHelpers({
  getterType: 'auth/getLoginFormFields',
  mutationType: 'auth/updateLoginFormFields',
});

export default {
  name: 'Login',
  components: { SupportIcon },
  computed: {
    ...mapFields([
      'identifier',
      'password',
    ]),
    isError() {
      return this.$store.getters['auth/isError'];
    },
    getLoader() {
      return this.$store.getters['auth/getLoader'];
    },
  },
  methods: {
    login() {
      this.$store.dispatch('auth/login').then(() => {
        this.$router.push({ name: 'Home' });
      });
    },
  },
};
</script>

<style scoped>

</style>
