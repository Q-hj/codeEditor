<script setup lang="ts" name="KonvaEditor">
import { onMounted, onUnmounted } from 'vue';

import Konva from 'Konva';

import { Procedure } from './Procedure';

import useInput from '@/hooks/useInput';

import instructList from '../instructList.json';

const { handleInputChange } = useInput();

console.log(instructList);

const mockDate = [];
for (let index = 0; index < 10000; index++) {
  mockDate.push(instructList[1]);
}

let stage: Konva.Stage;

onMounted(() => {
  const screenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  const screenHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  stage = new Procedure(
    {
      container: 'container',
      width: screenWidth,
      height: screenHeight,
    },
    instructList,
  );
});

onUnmounted(() => {
  stage.destroy();
});
</script>

<template>
  <section class="relative">
    <input
      id="paramsInput"
      type="text"
      hidden
      class="absolute z100 px5 w100"
      @blur="handleInputChange"
    />
    <div id="container" wfull></div>
  </section>
</template>
