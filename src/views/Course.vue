<template>
  <section class="container mx-auto text-gray-400 bg-gray-900 body-font">
    <router-link :to="{ name: 'Home'}" custom v-slot="{ href, navigate }">
      <a :href="href" @click="navigate"
         class="px-5 text-blue-500 hover:text-blue-600 flex items-center">
        <ArrowCircleLeftIcon class="w-5 h-5 block mr-2"></ArrowCircleLeftIcon>
        Moje kursy
      </a>
    </router-link>
    <div v-if="getCourse" class="py-12 flex flex-wrap">
      <div class="md:w-1/4 -mt-4 px-5 hidden md:block">
        <div v-for="(content, index) in getCourse.chapters"
             :key="index"
             class="flex flex-col">
          <div class="text-xs text-white tracking-widest title-font mb-2 mt-4
          uppercase font-bold flex items-center">
            <ChevronRightIcon v-if="content.finished"
                       class="h-4 w-4 block text-green-500 relative -left-5 -mr-4">
            </ChevronRightIcon>
            {{ content.title }}
          </div>
          <a v-for="(sub, index) in content.subjects"
               :key="index" href="#"
               class="text-gray-300 hover:text-gray-100 cursor-pointer mb-1 ml-1">
            {{ sub.title }}
          </a>
        </div>
      </div>
      <div class="md:w-3/4 px-5">
        <h1 v-if="currentChapterId && currentChapter" class="text-white font-medium
         title-font text-2xl mb-2 sm:mb-0 flex items-center">
          <BookOpenIcon class="h-8 w-8 inline-block mr-2"></BookOpenIcon>
          Rozdział - {{ currentChapter.title }}
        </h1>

        <h2 v-if="currentSubjectId && currentSubject"
            class="text-xl font-medium title-font text-white mt-5">{{ currentSubject.title }}</h2>

        <div v-if="currentSubjectId && currentSubject"
           class="text-base leading-relaxed mt-2 markdown"
           v-html="converter.makeHtml(currentSubject.content)">
        </div>

        <JsFiddleFrame v-if="false" fiddleId="s6xfzq37" html css></JsFiddleFrame>

        <div v-if="isLastSubject && currentChapterId && currentChapter && currentChapter.quiz">
          <span class="text-xl font-medium title-font text-white">
            {{ currentChapter.quiz.title }}
          </span>
          <div v-for="(question, index) in currentChapter.quiz.questions" :key="question.id"
               class="bg-gray-800 my-2 mb-5 p-3 rounded-md">
            <span class="font-bold mb-2 block text-gray-300">
              {{ index + 1 }}. {{ question.question }}
            </span>
            <div v-for="answer in question.answers" :key="answer.id"
                 class="bg-gray-900 my-2 p-4 md:py-1 md:px-2 text-base
                   hover:bg-gray-500 cursor-pointer text-gray-200">
              {{ answer.answer }}
            </div>
          </div>
        </div>
        <div class="flex mt-12 items-center justify-end">
          <a v-if="prevButtonText" @click.prevent="prev"
             href="#" class="text-base mr-10 hover:text-white">
            {{ prevButtonText }}
          </a>
          <button @click="next" class="flex text-white bg-blue-500 border-0 py-2 px-8
          focus:outline-none hover:bg-blue-600 rounded text-base">{{ nextButtonText }}</button>
        </div>
      </div>
    </div>
    <teleport to="body">
      <Modal v-model="dialog"
             title="Zakończ kurs"
             description="Czy chcesz zakończyć kurs?"></Modal>
    </teleport>
  </section>
</template>

<script>
import { ArrowCircleLeftIcon, BookOpenIcon, ChevronRightIcon } from '@heroicons/vue/solid';
import JsFiddleFrame from '@/components/widgets/JsFiddleFrame.vue';
import showdown from 'showdown';
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/github-dark.css';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/scss';
import xml from 'highlight.js/lib/languages/xml';
import Modal from '@/components/Modal.vue';

hljs.registerLanguage('xml', xml);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('scss', css);

const converter = new showdown.Converter();
converter.setOption('noHeaderId', true);

export default {
  name: 'Course',
  components: {
    Modal,
    JsFiddleFrame,
    ArrowCircleLeftIcon,
    BookOpenIcon,
    ChevronRightIcon,
  },
  props: {
    id: {
      required: true,
    },
  },
  computed: {
    getCourse() {
      return this.$store.getters['course/getCourse'];
    },
    getChapters() {
      return this.getCourse && this.getCourse.chapters;
    },
    currentSubject() {
      return this.getSubject(this.currentChapterId, this.currentSubjectId);
    },
    currentChapter() {
      return this.getChapter(this.currentChapterId);
    },
    isLastSubject() {
      if (this.currentSubjectId) {
        return this.currentSubjectId === this.subjectIds[this.subjectIds.length - 1];
      }
      return false;
    },
    isLastChapter() {
      return this.currentChapterId === this.chaptersIds[this.chaptersIds.length - 1];
    },
    isFirstSubject() {
      if (this.currentSubjectId) {
        return this.currentSubjectId === this.subjectIds[0];
      }
      return false;
    },
    isFirstChapter() {
      return this.currentChapterId === this.chaptersIds[0];
    },
    nextButtonText() {
      if (this.isLastSubject) {
        return this.isLastChapter ? 'Zakończ' : 'Następny rozdział';
      }
      return 'Następny temat';
    },
    prevButtonText() {
      if (this.isFirstSubject) {
        return this.isFirstChapter ? '' : 'Poprzedni rozdział';
      }
      return 'Poprzedni temat';
    },
  },
  data() {
    return {
      currentChapterId: null,
      currentSubjectId: null,
      chaptersIds: [],
      subjectIds: [],
      converter,
      dialog: false,
    };
  },
  methods: {
    getChapter(chapterId) {
      const chapter = this.getChapters.find((el) => el.id === chapterId);
      return chapter || [];
    },
    getSubject(chapterId, subjectId) {
      if (chapterId && subjectId) {
        const chapter = this.getChapters.find((el) => el.id === chapterId);
        const subjects = chapter && chapter.subjects.find((el) => el.id === subjectId);
        return subjects || null;
      }
      return null;
    },
    findSubjectIds() {
      const chapter = this.getChapter(this.currentChapterId);
      const subjects = chapter && chapter.subjects && chapter.subjects.map((el) => el.id);
      this.subjectIds = subjects || [];
      if (this.subjectIds) {
        const [firstSubject] = this.subjectIds;
        this.currentSubjectId = firstSubject;
      }
    },
    findChapterIds() {
      this.chaptersIds = this.getChapters.map((el) => el.id);
      if (this.chaptersIds) {
        const [firstChapter] = this.chaptersIds;
        this.currentChapterId = firstChapter;
      }
    },
    next() {
      if (this.isLastSubject) {
        if (this.isLastChapter) {
          this.dialog = true;
        } else {
          const index = this.chaptersIds.indexOf(this.currentChapterId);
          this.currentChapterId = this.chaptersIds[index + 1];
        }
      } else {
        const index = this.subjectIds.indexOf(this.currentSubjectId);
        this.currentSubjectId = this.subjectIds[index + 1];
      }
    },
    prev() {
      if (this.isFirstSubject) {
        if (this.isFirstChapter) {
          console.log('stop');
        } else {
          const index = this.chaptersIds.indexOf(this.currentChapterId);
          this.currentChapterId = this.chaptersIds[index - 1];
          this.findSubjectIds();
          this.currentSubjectId = this.subjectIds[this.subjectIds.length - 1];
        }
      } else {
        const index = this.subjectIds.indexOf(this.currentSubjectId);
        this.currentSubjectId = this.subjectIds[index - 1];
      }
    },
  },
  watch: {
    currentSubject() {
      this.$nextTick(() => {
        hljs.highlightAll();
      });
    },
    currentChapterId(currentChapterId, oldCurrentChapterId) {
      if (currentChapterId > oldCurrentChapterId) {
        this.findSubjectIds();
      }
    },
  },
  created() {
    this.$store.dispatch('course/getCourse', { courseId: this.id }).then(() => {
      this.findChapterIds();
      this.findSubjectIds();
    });
  },
};
</script>

<style lang="scss">
.markdown {
  h2 {
    margin-top: 1.25rem;
    font-size: 1rem;
    line-height: 1.75rem;
    color: white;
    font-weight: 500;
  }
  p {
    margin-bottom: 0.75rem;
  }
  pre {
    background: #0d1117;
    padding: 10px;
    margin-bottom: 0.75rem;
  }
}
</style>
