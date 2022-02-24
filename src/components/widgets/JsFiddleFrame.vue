<template>
  <div class="w-full mt-5 fiddle-background fiddle-height">
    <div v-show="!visible" class="fiddle-header w-full bg-red-600 block flex items-center px-5">
      Wczytywanie...
    </div>
    <iframe v-show="visible" width="100%" height="100%" loading="lazy" :onload="onload"
            :src="src"></iframe>
  </div>
</template>

<script>
export default {
  name: 'JsFiddleFrame',
  props: {
    fiddleId: {
      type: String,
      required: true,
    },
    html: {
      type: Boolean,
      default: false,
    },
    css: {
      type: Boolean,
      default: false,
    },
    js: {
      type: Boolean,
      default: false,
    },
    result: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visible: false,
      src: null,
    };
  },
  methods: {
    onload(ev) {
      this.visible = ev.returnValue;
    },
  },
  created() {
    const options = [];
    if (this.html) {
      options.push('html');
    }
    if (this.css) {
      options.push('css');
    }
    if (this.js) {
      options.push('js');
    } if (this.result) {
      options.push('result');
    }

    this.src = `//jsfiddle.net/${this.fiddleId}/embedded/${options.join(',')}/dark/`;
  },
};
</script>

<style scoped>
.fiddle-background {
  background-color: #20262E;
}
.fiddle-height {
  height: 300px;
}
.fiddle-header {
  height: 50px;
  background-color: #1c2128;
}
</style>
