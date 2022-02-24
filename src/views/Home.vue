<template>
  <Container>
    <template v-slot:header>
      <ContainerTitle title="Moje kursy" subtitle="SEKCJA UCZNIA"></ContainerTitle>
    </template>
    <template v-slot:body>
      <ContainerBlock title="Vue - Wprowadzenie" description="Test"></ContainerBlock>
    </template>
  </Container>
  <Container>
    <template v-slot:header>
      <ContainerTitle title="Zobacz więcej kursów" subtitle="AKTUALNE KURSY"></ContainerTitle>
    </template>
    <template v-slot:body>
      <ContainerBlock title="Vue - Kurs dla początkujących" description="Test"></ContainerBlock>
      <ContainerBlock title="Vuex - Podstawy" description="Test"></ContainerBlock>
      <ContainerBlock title="Jest - Testy jednostkowe Vue" description="Test"></ContainerBlock>
      <ContainerBlock title="Vue 3.x - Kurs" description="Test"></ContainerBlock>
      <ContainerBlock title="Vue - Kurs zaawansowany" description="Test"></ContainerBlock>
    </template>
  </Container>
</template>

<script>
import Container from '../components/widgets/Container.vue';
import ContainerTitle from '../components/widgets/ContainerTitle.vue';
import ContainerBlock from '../components/widgets/ContainerBlock.vue';

export default {
  name: 'Home',
  components: {
    ContainerBlock,
    ContainerTitle,
    Container,
  },
};
</script>
