<script setup lang="ts">
defineOptions({
  name: 'CodeEditor',
});
import CodeEditor from '@/components/codeEditor/codeEditor.vue';
import { onMounted, ref } from 'vue';

const codeEditorRef = ref<InstanceType<typeof CodeEditor>>();

const codeValue = ref('');

onMounted(async () => {
  const response = await fetch('./test.txt');

  codeValue.value = await response.text();
});

// 代码块提示
const suggestions = [
  {
    label: 'LD',
    detail: '读取开关量',
  },
  {
    label: 'LDN',
    detail: '读取开关量并取反',
  },
  {
    label: 'MOVE',
    detail: '赋值',
  },

  {
    label: 'BLKMOVE',
    detail: '块转移',
  },
];

const theme = ref('vs-dark');

/** 切换主题 */
const handleChangeTheme = () => {
  codeEditorRef.value?.setTheme(theme.value);
};

const language = ref('IL');

/** 切换主题 */
const handleChangeLanguage = () => {
  codeEditorRef.value?.setLanguage(language.value);
};

/** 切换字体大小 */
const handleChangeFontSize = (fontSize: number) => {
  codeEditorRef.value?.setFontSize(fontSize);
};
</script>

<template>
  <section class="h-100vh flex-col">
    <nav>
      <p>
        语言：
        <a-select
          v-model="language"
          style="width: 200px"
          @change="handleChangeLanguage"
        >
          <a-option>IL</a-option>
          <a-option>C</a-option>
        </a-select>
      </p>
      <p>
        现支持代码提示：<span
          v-for="{ label } in suggestions"
          :key="label"
          class="words"
        >
          {{ label }}</span
        >
      </p>
      <p>
        主题：
        <a-select
          v-model="theme"
          style="width: 200px"
          @change="handleChangeTheme"
        >
          <a-option>vs-dark</a-option>
          <a-option>my-dark</a-option>
        </a-select>
      </p>
      <p>
        字体大小：
        <a-input-number
          :style="{ width: '160px' }"
          :default-value="16"
          :min="10"
          :max="30"
          mode="button"
          @change="(val) => handleChangeFontSize(val as number)"
        />
      </p>
    </nav>

    <main class="flex-1">
      <!-- 代码编辑器 -->
      <CodeEditor
        ref="codeEditorRef"
        v-model="codeValue"
        language="IL"
        :suggestions="suggestions"
        style="height: 100%"
      />
    </main>
  </section>
</template>
<style lang="less" scoped>
nav {
  background-color: #1e1e1e;
  @apply color-white p30 text-18;

  p + p {
    margin-top: 10px;
  }

  .words {
    color: #2c9ad2;
    margin-left: 10px;
    &::after {
      content: '、';
      margin-right: 8px;
    }
    &:last-child {
      &::after {
        content: none;
      }
    }
  }
}
</style>
