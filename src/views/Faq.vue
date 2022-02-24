<template>
  <Container :grid="false">
    <template v-slot:header>
      <ContainerTitle title="FAQ" subtitle="Najczęściej zadawane pytania"></ContainerTitle>
    </template>
    <template v-slot:body>
      <div v-if="getContent">
        <ContainerQuestion v-for="item in getContent.question" :key="item.id"
                           :question="item.question"
                           :answer="item.answer">
        </ContainerQuestion>
      </div>
      <ContainerQuestion v-else blocked
                         answer=""
                         question="Wczytywanie pytań"
                         style="filter: blur(2px)"
                         class="animate-pulse">
      </ContainerQuestion>
    </template>
  </Container>
</template>

<script>
import Container from '@/components/widgets/Container.vue';
import ContainerTitle from '@/components/widgets/ContainerTitle.vue';
import ContainerQuestion from '@/components/widgets/ContainerQuestion.vue';

export default {
  name: 'Faq',
  components: { ContainerQuestion, ContainerTitle, Container },
  computed: {
    getContent() {
      return this.$store.getters['singlePage/getContent'];
    },
    getLoader() {
      return this.$store.getters['singlePage/getLoader'];
    },
  },
  created() {
    this.$store.dispatch('singlePage/getPage', 'faq');
  },
};
</script>

<style scoped>

</style>
