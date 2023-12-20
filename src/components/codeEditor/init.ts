import {} from 'monaco-editor';

//  基本API
import { editor, languages } from 'monaco-editor/esm/vs/editor/editor.api.js';

// JavaScript 内置语言包
// import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';

// st 内置语言包
import 'monaco-editor/esm/vs/basic-languages/st/st.contribution';
// c++ 内置语言包
import 'monaco-editor/esm/vs/basic-languages/cpp/cpp.contribution';

//  内置所有语言包
// import 'monaco-editor/esm/vs/basic-languages/monaco.contribution';

// 查找控件
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js';

// import './worker';

console.log(languages.getLanguages());

// languages.register({ id: 'myJavascript' });
// languages.setMonarchTokensProvider('myJavascript', {
//   tokenizer: {
//     root: [
//       [/\d+/, { token: 'keyword' }], // 数字
//       [/[a-z]+/, { token: 'string' }], // 小写字符串
//     ],
//   },
// });

let instance;

/**
 * 编辑器初始化
 * @param domName dom选择器名
 */
export function initCodeEditor(domName: string) {
  const dom = document.querySelector(domName) as HTMLDivElement;
  const jsCode = ['function x() {', '\tconsole.log("Hello world!");', '}'].join(
    '\n',
  );
  const cCode = [
    '#pragma warning(disable : 4532)',
    '#pragma warning(disable : 4702)',
  ].join('\n');

  const cssCode = ['body{', '\tmargin:0;', '}'].join('\n');

  instance = editor.create(dom, {
    value: cCode,
    language: 'c',
    theme: 'vs-dark',
  });

  // instance.dispose(); //使用完成销毁实例
}

/**
 * 获取编辑器内容
 */
export const getValue = (): string => instance!.getValue();
