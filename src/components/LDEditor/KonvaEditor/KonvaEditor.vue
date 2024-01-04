<script setup lang="ts" name="KonvaEditor">
import { onMounted, onUnmounted, ref } from 'vue';

import Konva from 'Konva';

import { debounce } from 'lodash-es';

import { Procedure } from './Procedure';

import useInput from '@/hooks/useInput';

import instructList from '../instructList.json';

import { Instruction } from '@/types/Instruction';

const { handleInputChange } = useInput();

// console.log(instructList);

const mockDate: Instruction[] = [];

for (let index = 0; index < 100; index++) {
  mockDate.push(instructList[1]);
  mockDate.push(instructList[2]);
}

let stage: Konva.Stage;

const sectionRef = ref<HTMLElement>();

onMounted(() => {
  const width = sectionRef.value!.clientWidth;
  const height = sectionRef.value!.clientHeight;
  // console.log(width);
  // console.log(height);

  stage = new Procedure(
    {
      container: 'container',
      width,
      height,
    },
    mockDate,
  );

  const handleContainerResize = debounce((width, height) => {
    stage.setAttrs({ width, height });
    stage.draw();
  }, 10);

  // 创建ResizeObserver实例
  const resizeObserver = new ResizeObserver((entries) => {
    const { width, height } = entries[0].contentRect;
    handleContainerResize(width, height);
  });

  // 开始监听容器的尺寸变化
  resizeObserver.observe(sectionRef.value!);
});

onUnmounted(() => {
  stage.destroy();
});
</script>

<template>
  <section ref="sectionRef" class="h-full relative">
    <input
      id="paramsInput"
      type="text"
      hidden
      class="absolute z100 px5 w100"
      @blur="handleInputChange"
      @keyup.enter="handleInputChange"
    />
    <div id="container" wfull></div>
  </section>
</template>
