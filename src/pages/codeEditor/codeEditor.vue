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
  <section>
    <!-- <h1>codeEditor</h1> -->
    <CodeEditor v-model="codeValue" language="IL" style="height: 700px" />
  </section>
</template>
<style lang="less" scoped></style>
