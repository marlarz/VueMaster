<template>
  <TransitionRoot appear :show="modelValue" as="template">
    <Dialog as="div" @close="closeModal">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
            <DialogOverlay class="fixed inset-0 bg-black opacity-70" />

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="inline-block w-full max-w-md p-6 my-8 text-left
              align-middle transition-all transform bg-gray-800 shadow-xl rounded-2xl"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-200"
              >
                {{ title }}
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-400 leading-relaxed">
                  {{ description }}
                </p>
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center px-4 py-2 text-sm font-medium
                  text-white bg-blue-500 border border-transparent rounded-md
                  hover:bg-blue-200 focus:outline-none focus-visible:ring-2
                  focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  @click="closeModal"
                >
                  Zakończ
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import {
  Dialog,
  DialogOverlay,
  DialogTitle, TransitionRoot, TransitionChild,
} from '@headlessui/vue';

export default {
  name: 'Modal',
  components: {
    Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot,
  },
  props: {
    modelValue: Boolean,
    title: String,
    description: String,
  },
  methods: {
    closeModal() {
      this.$emit('update:modelValue', false);
    },
    openModal() {
      this.$emit('update:modelValue', true);
    },
  },
};
</script>

<style scoped>

</style>
