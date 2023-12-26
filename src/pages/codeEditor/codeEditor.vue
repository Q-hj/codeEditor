<script setup lang="ts">
import CodeEditor from '@/components/codeEditor/codeEditor.vue';
import { onMounted, ref } from 'vue';

const codeValue = ref('');

onMounted(async () => {
  const response = await fetch('./test.txt');

  codeValue.value = await response.text();
});
</script>

<template>
  <section class="h-100vh">
    <!-- <h1>codeEditor</h1> -->
    <CodeEditor v-model="codeValue" language="IL" style="height: 100%" />
  </section>
</template>
<style lang="less" scoped></style>
