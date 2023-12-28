<script setup lang="ts">
defineOptions({
  name: 'LdEditor',
});

import KonvaEditor from '@/components/LDEditor/KonvaEditor/KonvaEditor.vue';

interface LDNetwork {
  title?: string;
  type: '-| |-' | '-|/|-' | '-|I|-';
  input: string | string[];
  output: string | string[];
}

const data: LDNetwork[] = [
  {
    title: 'LD Editor',
    type: '-| |-',
    input: 'LD',
    output: 'LD',
  },
];
</script>

<template>
  <section pl300>
    <KonvaEditor />
  </section>
</template>
