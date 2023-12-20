<script setup lang="ts" name="codeEditor">
import { onMounted } from 'vue';

import { getValue, initCodeEditor } from './init';

onMounted(() => {
  initCodeEditor('#monaco-editor');

  console.log(getValue());
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
