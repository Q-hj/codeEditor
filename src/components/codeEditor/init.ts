// import { editor, languages } from 'monaco-editor';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js';
import { editor, languages } from 'monaco-editor/esm/vs/editor/editor.api.js';

import './worker';

console.log(languages.getLanguages());

languages.register({ id: 'myJavascript' });
languages.setMonarchTokensProvider('myJavascript', {
  tokenizer: {
    root: [
      [/\d+/, { token: 'keyword' }], // 数字
      [/[a-z]+/, { token: 'string' }], // 小写字符串
    ],
  },
});

let instance;

/**
 * 编辑器初始化
 * @param domName dom选择器名
 */
export function initCodeEditor(domName: string) {
  const dom = document.querySelector(domName) as HTMLDivElement;
  instance = editor.create(dom, {
    value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
    language: 'javascript', // 'myJavascript'
    theme: 'vs-dark', // 'myStyle'
  });
}

/**
 * 获取编辑器内容
 */
export const getValue = (): string => instance!.getValue();
