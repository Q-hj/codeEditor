<script setup lang="ts" name="codeEditor">
import { onBeforeUnmount, onMounted, watch } from 'vue';

import { editor, IDisposable } from 'monaco-editor/esm/vs/editor/editor.api.js';

// # 引入自定义语言功能
import { registerCompletion, token } from './languages';

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

let editorCompletion: IDisposable;

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

  editorCompletion = registerCompletion(props.suggestions);

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

  // 销毁语法提示器实例
  editorCompletion.dispose();
});

// 加载一个新的主题
editor.defineTheme('my-dark', {
  base: 'vs-dark', // 继承 VS Code 的颜色基础
  inherit: true,
  rules: [
    { token: 'keyword', foreground: 'b799f4' },
    { token: 'string', foreground: 'f8c775' },
  ],
  colors: {
    // 选中行的背景色
    // 'editor.lineHighlightBackground': '#0000FF20',
  },
});

/**
 * 设置主题
 * @param theme 主题名
 */
const setTheme = (theme: string) => {
  editor.setTheme(theme);
};

/**
 * 设置语言
 * @param language 语言id
 */
const setLanguage = (language: string) => {
  const model = editorInstance.getModel() as editor.ITextModel;
  editor.setModelLanguage(model, language);
};

defineExpose({
  setTheme,
  setLanguage,
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
