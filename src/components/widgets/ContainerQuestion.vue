<template>
  <Disclosure>
    <div class="rounded-lg w-full lg:w-2/3 mx-auto bg-gray-700 mb-8">
      <DisclosureButton as="div">
        <div class="flex items-center bg-gray-800 px-8 py-4
        rounded-lg rounded-b-none cursor-pointer">
          <QuestionMarkCircleIcon class="block h-7 w-7 text-gray-200 mr-3"></QuestionMarkCircleIcon>
          <h2 class="text-gray-200 text-base font-bold">{{ question }}</h2>
        </div>
      </DisclosureButton>
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform opacity-0"
        enter-to-class="transform opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform opacity-100"
        leave-to-class="transform opacity-0"
      >
      <DisclosurePanel :static="blocked">
        <div class="flex items-center px-8 py-4">
          <p class="text-base text-gray-200">
            {{ answer }}
          </p>
        </div>
      </DisclosurePanel>
      </transition>
    </div>
  </Disclosure>
</template>

<script>
import { QuestionMarkCircleIcon } from '@heroicons/vue/outline';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';

export default {
  name: 'ContainerQuestion',
  components: {
    Disclosure, DisclosurePanel, DisclosureButton, QuestionMarkCircleIcon,
  },
  props: {
    blocked: {
      type: Boolean,
      default: false,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>

</style>
