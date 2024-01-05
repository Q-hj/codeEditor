<script setup lang="ts" name="KonvaEditor">
import { onMounted, onUnmounted, ref } from 'vue';

import Konva from 'Konva';

import { debounce } from 'lodash-es';

import { Procedure } from './Procedure';

import useInput from '@/hooks/useInput';

import { useAppStore } from '@/store/app';

import { networkConfig } from './Procedure';

const { handleInputChange } = useInput();

const { ldData } = useAppStore();

console.log(ldData);

const allWidth = ldData[0].content.length * networkConfig.blockWidth;

const allHeight = ldData.length * networkConfig.height();

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
    ldData,
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

  var scrollContainer = sectionRef.value!;

  const repositionStage = () => {
    var dx = scrollContainer.scrollLeft;
    var dy = scrollContainer.scrollTop;

    stage.container().style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';

    stage.x(-dx);
    stage.y(-dy);
    stage.batchDraw();
  };
  scrollContainer.addEventListener('scroll', repositionStage);
  repositionStage();
});

onUnmounted(() => {
  stage.destroy();
});
</script>

<template>
  <!-- 外层容器（可滚动） -->
  <section ref="sectionRef" class="scroll-container">
    <!-- 参数输入框 -->
    <input
      id="paramsInput"
      type="text"
      hidden
      class="absolute z100 px5 w100"
      @blur="handleInputChange"
      @keyup.enter="handleInputChange"
    />

    <!-- 用于模拟画布完整大小 -->
    <div
      class="overflow-hidden"
      :style="{
        width: `${allWidth}px`,
        height: `${allHeight}px`,
      }"
    >
      <!-- 画布容器 -->
      <div id="container" class="overflow-hidden"></div>
    </div>
  </section>
</template>

<style scoped>
.scroll-container {
  width: 100%;
  height: calc(100vh - 60px);
  overflow: auto;
  position: relative;
}
</style>
