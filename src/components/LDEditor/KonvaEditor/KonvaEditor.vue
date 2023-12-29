<script setup lang="ts" name="KonvaEditor">
import Konva from 'Konva';
import { onMounted } from 'vue';

import { InsNetwork } from './InsNetwork';

import useInput from '@/hooks/useInput';

import instructList from '../instructList.json';

const { handleInputChange } = useInput();

console.log(instructList);

onMounted(() => {
  var screenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  var screenHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  // first we need to create a stage
  const stage = new Konva.Stage({
    container: 'container',
    width: screenWidth,
    height: screenHeight,
  });

  stage.add(new InsNetwork(instructList));
});
</script>

<template>
  <section class="relative">
    <input
      id="paramsInput"
      type="text"
      hidden
      class="absolute z100 px5"
      @change="handleInputChange"
    />
    <div id="container" wfull></div>
  </section>
</template>
