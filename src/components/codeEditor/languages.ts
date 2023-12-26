import { languages } from 'monaco-editor/esm/vs/editor/editor.api.js';

// # 代码联想提示
import 'monaco-editor/esm/vs/editor/contrib/suggest/browser/suggestController.js';
// import 'monaco-editor/esm/vs/editor/contrib/tokenization/browser/tokenization.js';

// # 语言包：代码高亮、提示

//  内置所有语言包
// import 'monaco-editor/esm/vs/basic-languages/monaco.contribution';

// JavaScript 内置语言包
// import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';

// st 内置语言包
import 'monaco-editor/esm/vs/basic-languages/st/st.contribution';
// c++ 内置语言包
import 'monaco-editor/esm/vs/basic-languages/cpp/cpp.contribution';

// 自定义高亮
// import custom_lang from './custom_lang';

import { Suggestion } from './type';

const lang = 'IL';

// 注册自定义语言
languages.register({ id: lang });

// 为该自定义语言基本的Token
export const token = languages.setMonarchTokensProvider(lang, {
  // API: languages.IMonarchLanguage

  // 是否忽略大小写
  ignoreCase: true,

  // defaultToken: 'invalid',

  // 关键字
  keywords: [
    'MOVE',
    'R',
    'BLKMOVE',
    'TON',
    'LD',
    'GT',
    'TP',
    'OR',
    'LT',
    'AND',
    'ST',
    'LDN',
    'FILL',
    'CAL',
    'ANDN',
    'TCP_MBUSW',
    'TCP_MBUSR',
    'TCP_RCV',
    '__CR_EQ_1',
    '__CR_RESTORE',
  ],

  function: [],

  // 类型关键字
  typeKeywords: ['TRUE'],

  // 操作符
  operators: [],

  // 数字
  digits: /\d+(_+\d+)*/,
  octaldigits: /[0-7]+(_+[0-7]+)*/,
  binarydigits: /[0-1]+(_+[0-1]+)*/,
  hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,

  // 分词器
  tokenizer: {
    root: [
      [
        /[a-zA-Z_$][\w$]*/,
        {
          cases: {
            '@keywords': 'keyword',
            '@typeKeywords': 'keyword',
            '@default': 'identifier',
          },
        },
      ],
      // 匹配%
      [/%/, { token: 'key' }],
      // 匹配Network
      [/\(\*\s*Network\s*\d+\s*\*\)/, { token: 'string' }],
      // 注释
      [/\(\*.*?\*\)/, { token: 'comment' }],

      // 匹配括号
      [/\(|\)/, { token: 'keyword' }],
      //   [/(['"]).*?\1/, { token: 'rematch' }], //字符串
      //   [/\d+/, { token: 'number' }], // 数字
      //   [/[a-zA-Z]+/, { token: 'string' }], // 字母
    ],
  },
});

// 为该语言注册一个代码提示器
// export const suggestions = languages.registerCompletionItemProvider(lang, {
//   provideCompletionItems: (model, position) => {
//     const word = model.getWordUntilPosition(position);
//     const range = {
//       startLineNumber: position.lineNumber,
//       endLineNumber: position.lineNumber,
//       startColumn: word.startColumn,
//       endColumn: word.endColumn,
//     };

//     // 将建议数组抽离到单独文件中
//     // const suggestions = [
//     //   {
//     //     label: 'cxk',
//     //     kind: languages.CompletionItemKind.Text,
//     //     insertText: 'rap',
//     //     insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
//     //     range,
//     //   },
//     //   {
//     //     label: 'for',
//     //     // 详情，用于触发建议时展示
//     //     detail: 'For Loop',
//     //     // 描述
//     //     documentation: 'for循环',
//     //     // 建议类型
//     //     kind: languages.CompletionItemKind.Snippet,
//     //     // 插入内容
//     //     insertText: [
//     //       'for (let index = 0; index < array.length; index++) {',
//     //       '   const element = array[index];',
//     //       '   $1',
//     //       '}',
//     //     ].join('\n'),

//     //     // 调整多行插入文本的空白/缩进以匹配当前行缩进。
//     //     insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,

//     //     // 要被替换的文本范围
//     //     range,
//     //   },
//     // ];

//     const suggestions = words.map(({ label, detail }) => ({
//       label,
//       // 详情，用于触发建议时展示
//       detail,
//       // 描述
//       documentation: detail,
//       // 建议类型
//       kind: languages.CompletionItemKind.Text,
//       // 插入内容
//       insertText: `${label.padEnd(8)}$0`,

//       // 调整多行插入文本的空白/缩进以匹配当前行缩进。
//       insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,

//       // 要被替换的文本范围
//       range,
//     }));

//     return { suggestions };
//   },
// });

/**
 * 根据提示数组注册一个代码提示器
 * @param suggestions 语法提示数组
 * @returns 提示器（可销毁）
 */
export const registerCompletion = (suggestions: Suggestion[]) => {
  return languages.registerCompletionItemProvider(lang, {
    provideCompletionItems: (model, position) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      return {
        suggestions: suggestions.map(({ label, detail }) => ({
          label,
          // 详情，用于触发建议时展示
          detail,
          // 描述
          documentation: detail,
          // 建议类型
          kind: languages.CompletionItemKind.Text,
          // 插入内容
          insertText: `${label.padEnd(8)}$0`,

          // 调整多行插入文本的空白/缩进以匹配当前行缩进。
          insertTextRules:
            languages.CompletionItemInsertTextRule.InsertAsSnippet,

          // 要被替换的文本范围
          range,
        })),
      };
    },
  });
};
