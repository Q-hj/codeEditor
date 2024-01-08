<script setup lang="ts" name="KonvaEditor">
import { onMounted, onUnmounted, ref } from 'vue';

import { debounce } from 'lodash-es';

import { Procedure } from './Procedure';

import useInput from '@/hooks/useInput';

import { useAppStore } from '@/store/app';

import { blockConfig, drawConfig, networkConfig } from './config';

const { handleInputChange } = useInput();

const { ldData } = useAppStore();

console.log(ldData);

const allWidth = ldData[0].content.length * blockConfig.width();

const allHeight = ldData.length * networkConfig.height();

let stage: Procedure;

const sectionRef = ref<HTMLElement>();

onMounted(() => {
  const scrollContainer = sectionRef.value!;

  const width = scrollContainer.clientWidth;
  const height = scrollContainer.clientHeight;
  // console.log(width);
  // console.log(height);

  /** 修改全局配置 */
  Object.assign(drawConfig, { width, height });

  stage = new Procedure(
    {
      container: 'container',
      width,
      height,
    },
    ldData,
  );

  // # 监听容器的尺寸变化来重新绘制内容
  let flag = true;
  const handleContainerResize = debounce((width, height) => {
    /** 修改全局配置 */
    Object.assign(drawConfig, { width, height });
    if (flag) return (flag = false);

    /** 更新stage尺寸 */
    stage.setAttrs({ width, height });

    stage.redraw(stage);
  }, 50);

  // 创建ResizeObserver实例
  const resizeObserver = new ResizeObserver((entries) => {
    const { width, height } = entries[0].contentRect;
    handleContainerResize(width, height);
  });

  // 开始监听
  resizeObserver.observe(scrollContainer);

  // # 监听容器的滚动条高度来重新绘制内容
  const repositionStage = debounce(() => {
    const x = scrollContainer.scrollLeft;
    const y = scrollContainer.scrollTop;

    // 让stage始终处于可见区域
    stage.container().style.transform = 'translate(' + x + 'px, ' + y + 'px)';

    /** 更新stage坐标 */
    stage.setAttrs({ x: -x, y: -y });

    stage.redraw(stage);
  }, 50);

  scrollContainer.addEventListener('scroll', repositionStage);

  // repositionStage();
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
