<script setup lang="ts">
import { RouterView } from 'vue-router';

import { instructionController } from '@/controllers/instructionController';

const menu = [
  '文件',
  '编辑',
  '查看',
  '工程',
  'PLC',
  '调试',
  '工具',
  '向导',
  '窗口',
  '帮助',
];

const treeData = [
  {
    title: 'Trunk 0-0',
    key: '0-0',
    children: [
      {
        title: 'Branch 0-0-0',
        key: '0-0-0',
        children: [
          {
            title: 'Leaf',
            key: '0-0-0-0',
          },
          {
            title: 'Leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'Branch 0-0-1',
        key: '0-0-1',
        children: [
          {
            title: 'Leaf',
            key: '0-0-1-0',
          },
        ],
      },
    ],
  },
];

function getData() {
  console.time();
  instructionController.GetLDInstructions().then((e) => {
    e = JSON.parse(e);
    console.timeEnd();
  });
}
</script>

<template>
  <a-layout h-full>
    <a-layout-header class="bg-gray-2/75">
      <span v-for="item in menu" :key="item" class="ml8 leading-38">{{
        item
      }}</span>
    </a-layout-header>
    <a-layout>
      <a-layout-sider :resize-directions="['right']">
        <header class="bg-gray-3 pl10 py6" @click="getData">工程管理器</header>
        <main>
          <a-tree
            :data="treeData"
            show-line
            :default-expanded-keys="['0-0-0']"
            :default-selected-keys="['0-0-0', '0-0-1']"
          />
        </main>
      </a-layout-sider>
      <a-layout-content>
        <RouterView />
      </a-layout-content>
    </a-layout>
    <a-resize-box
      :directions="['top']"
      :style="{
        height: '300px',
        minHeight: '30px',
        maxHeight: '300px',
      }"
    >
      <a-layout-footer>
        <section>
          <header class="bg-blue-1 pl10 leading-30">信息输出窗口</header>
          <main></main>
        </section>
      </a-layout-footer>
    </a-resize-box>
  </a-layout>
</template>
<style scoped>
:deep(.arco-layout-sider) {
  width: 206px;
  background-color: #fff;
  min-width: 150px;
  max-width: 500px;
}
</style>
