import { languages } from 'monaco-editor/esm/vs/editor/editor.api.js';

// # 语言包：代码高亮、提示

//  内置所有语言包
// import 'monaco-editor/esm/vs/basic-languages/monaco.contribution';

// JavaScript 内置语言包
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';

// st 内置语言包
import 'monaco-editor/esm/vs/basic-languages/st/st.contribution';
// c++ 内置语言包
import 'monaco-editor/esm/vs/basic-languages/cpp/cpp.contribution';

import custom_lang from './custom_lang';

console.log(languages.getLanguages());

const lang = 'js';

export const testCode = [
  'class MyClass {',
  '  @attribute',
  '  void main() {',
  '    Console.writeln( "Hello Monarch world");',
  '  // 这是注释',
  '  for',
  '  }',
  '}',
].join('\n');

// 注册自定义语言
languages.register({ id: lang });

// 为该自定义语言基本的Token
languages.setMonarchTokensProvider(
  lang,
  custom_lang || {
    // defaultToken: 'invalid',
    keywords: ['IF', 'THEN', 'END', 'WHILE', 'DO', 'ELSE'],
    typeKeywords: [],
    operators: [
      '=',
      '>',
      '<',
      '==',
      '<=',
      '>=',
      '!=',
      '<>',
      '+',
      '-',
      '*',
      '/',
    ],
    digits: /\d+(_+\d+)*/,
    octaldigits: /[0-7]+(_+[0-7]+)*/,
    binarydigits: /[0-1]+(_+[0-1]+)*/,
    hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,

    // 标记器
    tokenizer: {
      root: [
        // [/\(\*Network 1\*\)/, { token: 'key' }],
        //   [/(['"]).*?\1/, { token: 'rematch' }], //字符串
        //   [/\d+/, { token: 'number' }], // 数字
        //   [/[a-zA-Z]+/, { token: 'string' }], // 字母
      ],
    },
  },
);

// 为该语言注册一个代码提示器
languages.registerCompletionItemProvider(lang, {
  // provideCompletionItems: () => {
  //   return { suggestions: custom_completion };
  // },
  provideCompletionItems: (model, position) => {
    const word = model.getWordUntilPosition(position);
    const range = {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: word.startColumn,
      endColumn: word.endColumn,
    };

    // 将建议数组抽离到单独文件中
    const suggestions = [
      {
        label: 'cxk',
        kind: languages.CompletionItemKind.Text,
        insertText: '唱、跳、rap、篮球',
        insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range,
      },
      {
        label: 'for',
        // 详情，用于触发建议时展示
        detail: 'For Loop',
        // 描述
        documentation: 'for循环',
        // 建议类型
        kind: languages.CompletionItemKind.Snippet,
        // 插入内容
        insertText: [
          'for (let index = 0; index < array.length; index++) {',
          '   const element = array[index];',
          '   $1',
          '}',
        ].join('\n'),

        // 调整多行插入文本的空白/缩进以匹配当前行缩进。
        insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,

        // 要被替换的文本范围
        range,
      },
    ];

    return { suggestions };
  },
});
