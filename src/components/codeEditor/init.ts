//  基本API
import { editor } from 'monaco-editor/esm/vs/editor/editor.api.js';

// 导入worker
import './worker';

// 导入语言
import { testCode } from './languages';

// # 编辑器功能

// 右键显示菜单
import 'monaco-editor/esm/vs/editor/contrib/contextmenu/browser/contextmenu.js';
// 查找功能
import 'monaco-editor/esm/vs/editor/contrib/find/browser/findController.js';
// 折叠功能
import 'monaco-editor/esm/vs/editor/contrib/folding/browser/folding.js';

// 格式化代码
import 'monaco-editor/esm/vs/editor/contrib/format/browser/formatActions.js';

// let instance;

/**
 * 编辑器初始化
 * @param domName dom选择器名
 */
export function initCodeEditor(domName: string) {
  const dom = document.querySelector(domName) as HTMLDivElement;

  const jsCode = [
    'function x() {',
    '\tconsole.log("Hello world!");',
    '\tconsole.log("123");',
    '}',
  ].join('\n');

  const cCode = [
    '#pragma warning(disable : 4532)',
    '#pragma warning(disable : 4702)',
  ].join('\n');

  const cssCode = ['body{', '\tmargin:0;', '}'].join('\n');

  const ILCode = ['(*Network 1*)', 'LD\t%I0.0', 'ATCH\tINT_0,'].join('\n');

  return editor.create(dom, {
    value: testCode,
    language: 'js',
    theme: 'vs-dark',
  });

  // instance.dispose(); //使用完成销毁实例
}

/**
 * 获取编辑器内容
 */
// export const getValue = (): string => instance!.getValue();
