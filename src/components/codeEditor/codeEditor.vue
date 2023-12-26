<script setup lang="ts" name="codeEditor">
import { onBeforeUnmount, onMounted, watch } from 'vue';

import { editor } from 'monaco-editor/esm/vs/editor/editor.api.js';

// # 引入自定义语言功能
import { suggestions, token } from './languages';

// 导入worker
// import './worker';

// # 编辑器功能

// 右键显示菜单
// import 'monaco-editor/esm/vs/editor/contrib/contextmenu/browser/contextmenu.js';
// 查找功能
import 'monaco-editor/esm/vs/editor/contrib/find/browser/findController.js';
// 折叠功能
// import 'monaco-editor/esm/vs/editor/contrib/folding/browser/folding.js';

// 格式化代码
// import 'monaco-editor/esm/vs/editor/contrib/format/browser/formatActions.js';

import { Props } from './type';

const props = defineProps<Props>();

let editorInstance: editor.IStandaloneCodeEditor;

watch(
  () => props.modelValue,
  (value) => {
    editorInstance.setValue(value);
  },
);

onMounted(() => {
  const editorDom = document.querySelector('#monaco-editor') as HTMLDivElement;

  editorInstance = editor.create(editorDom, {
    value: props.modelValue,
    language: props.language,
    theme: 'vs-dark',
  });

  // console.log(editorInstance.getValue());
});

// 监听窗口的尺寸变化事件，然后重新布局
window.addEventListener('resize', () => {
  editorInstance.layout();
});

onBeforeUnmount(() => {
  // 销毁编辑器实例
  editorInstance.dispose();

  // 销毁token实例
  token.dispose();

  // 销毁suggestions实例
  suggestions.dispose();
});
</script>

<template>
  <div id="monaco-editor"></div>
</template>
<style lang="less" scoped>
#monaco-editor {
  height: 500px;
}
</style>
