<script setup lang="ts" name="codeEditor">
import { onBeforeUnmount, onMounted } from 'vue';

import { editor } from 'monaco-editor/esm/vs/editor/editor.api.js';

import { initCodeEditor } from './init';

let editorInstance: editor.IStandaloneCodeEditor;

onMounted(() => {
  editorInstance = initCodeEditor('#monaco-editor');

  // console.log(editorInstance.getValue());
});

onBeforeUnmount(() => {
  // 销毁实例
  editorInstance.dispose();
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
