<template>
  <header class="text-gray-400 body-font shadow-xl border-b border-gray-800 mb-12">
    <div class="container mx-auto">
      <Disclosure as="nav" v-slot="{ open }">
        <div class="px-2 sm:px-6 lg:px-8">
          <div class="relative flex items-center justify-between h-24">
            <div class="absolute inset-y-0 right-0 flex items-center md:hidden">
              <!-- Mobile menu button-->
              <DisclosureButton class="inline-flex items-center justify-center p-2 rounded-md
              text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2
              focus:ring-inset focus:ring-white">
                <span class="sr-only">Open main menu</span>
                <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
              </DisclosureButton>
            </div>
            <div class="flex-1 flex items-center justify-center sm:justify-between">
              <div class="flex-shrink-1 flex items-center">
                <router-link to="/" custom v-slot="{ href, navigate }">
                  <a :href="href" @click="navigate"
                     class="flex title-font font-medium items-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-green-500 rounded-full" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    <span class="ml-3 text-xl">VueMaster</span>
                  </a>
                </router-link>
              </div>
              <div class="hidden md:block">
                <div class="flex space-x-5 items-center">
                  <router-link v-for="item in navigation"
                               :key="item.name" :to="item.href"
                               v-slot="{href, navigate, isActive}" custom>
                  <a :href="href" @click="navigate"
                     class="text-base"
                     :class="[isActive ? 'text-base text-gray-200 hover:text-white'
                     : 'hover:text-white']">{{ item.name }}</a>
                  </router-link>
                  <router-link v-if="!isAuthenticated"
                               :to="{name: 'Login'}" custom
                               v-slot="{navigate, href}">
                    <a :href="href" @click="navigate"
                       class="text-white bg-blue-500 border-0 py-1 px-5 focus:outline-none
                       hover:bg-blue-600 rounded text-base">
                      Zaloguj się
                    </a>
                  </router-link>
                  <Menu v-if="isAuthenticated" as="div" class="relative inline-block text-left">
                    <MenuButton class="text-gray-200 inline-flex items-center border-transparent">
                      {{ user.firstName }} {{ user.lastName }}
                      <ChevronDownIcon class="h-5 w-5 ml-1"></ChevronDownIcon>
                    </MenuButton>
                    <transition
                      enter-active-class="transition duration-100 ease-out"
                      enter-from-class="transform scale-95 opacity-0"
                      enter-to-class="transform scale-100 opacity-100"
                      leave-active-class="transition duration-75 ease-in"
                      leave-from-class="transform scale-100 opacity-100"
                      leave-to-class="transform scale-95 opacity-0"
                    >
                      <MenuItems class="absolute right-0 w-56 mt-2 origin-top-right
                      bg-gray-800
                      divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black
                      ring-opacity-5 focus:outline-none">
                        <div class="px-1 py-1">
                        <MenuItem>
                          <a href="#"
                             class="hover:text-white group flex rounded-md
                             items-center w-full px-2 py-2 text-sm">
                            Ustawienia
                          </a>
                        </MenuItem>
                          <MenuItem>
                            <a href="#"
                               class="hover:text-white group flex rounded-md
                             items-center w-full px-2 py-2 text-sm">
                              Pomoc
                            </a>
                          </MenuItem>
                        <MenuItem>
                          <a href="#" @click="logout"
                             class="hover:text-white group flex rounded-md
                             items-center w-full px-2 py-2 text-sm">
                            Wyloguj się
                          </a>
                        </MenuItem>
                        </div>
                      </MenuItems>
                    </transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DisclosurePanel class="md:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1">
            <a v-for="item in navigation" :key="item.name" :href="item.href"
               class="block px-3 py-2 rounded-md text-base"
               :class="[item.current ? 'text-base text-white hover:text-white'
               : 'hover:text-white']"
               :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue';
import {
  Disclosure, DisclosureButton, DisclosurePanel,
  Menu, MenuButton, MenuItem, MenuItems,
} from '@headlessui/vue';
import {
  MenuIcon, XIcon, ChevronDownIcon,
} from '@heroicons/vue/outline';

const navigation = [
  { name: 'Home', href: { name: 'Home' }, current: true },
  { name: 'Kursy', href: { name: 'Home' }, current: false },
  { name: 'FAQ', href: { name: 'Faq' }, current: false },
  { name: 'Kontakt', href: { name: 'Login' }, current: false },
];

export default {
  name: 'Header',
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    MenuIcon,
    XIcon,
    ChevronDownIcon,
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated'];
    },
    user() {
      return this.$store.getters['auth/getUser'].user;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
    },
  },
  setup() {
    const open = ref(false);

    return {
      navigation,
      open,
    };
  },
};
</script>
