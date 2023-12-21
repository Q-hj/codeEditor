import { languages } from 'monaco-editor/esm/vs/editor/editor.api.js';

export default [
  /**   * 内置函数   */
  {
    label: 'getValue',
    kind: languages.CompletionItemKind.Function,
    insertText: 'getValue(${1:pattern})',
    insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: '根据pattern描述的正则表达式，从数据项中获取匹配的字符串',
  },
  {
    label: 'getIniString',
    kind: languages.CompletionItemKind.Function,
    insertText: 'getIniString(${1:sec}, ${2: key})',
    insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      '从ini类型的数据中，根据section和key，获取key对应的值，作为字符串返回',
  },
  {
    label: 'getIniInt',
    kind: languages.CompletionItemKind.Function,
    insertText: 'getIniInt(${1:sec}, ${2: key})',
    insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      '从ini类型的数据中，根据section和key，获取key对应的值,，作为整数返回',
  },
  {
    label: 'getIniDouble',
    kind: languages.CompletionItemKind.Function,
    insertText: 'getIniDouble(${1:sec}, ${2: key})',
    insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      '从ini类型的数据中，根据section和key，获取key对应的值，作为浮点数返回',
  },
  {
    label: 'isEmpty',
    kind: languages.CompletionItemKind.Function,
    insertText: 'isEmpty(${1:str})',
    insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: '判断str是否为空',
  },
  {
    label: 'isEqual',
    kind: languages.CompletionItemKind.Function,
    insertText: 'isEqual(${1:str1}, ${2: str2})',
    insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: '判断str是否为空',
  },
  {
    label: 'isContain',
    kind: languages.CompletionItemKind.Function,
    insertText: 'isContain(${1:str})',
    insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: '判断数据项中是否包含str',
  },
  {
    label: 'getJsonInt',
    kind: languages.CompletionItemKind.Function,
    insertText: 'getJsonInt(${1:path})',
    insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: '根据path获取JSON数据中作为整数返回的值',
  },
  {
    label: 'getJsonDouble',
    kind: languages.CompletionItemKind.Function,
    insertText: 'getJsonDouble(${1:path})',
    insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: '根据path获取JSON数据中作为整数返回的值',
  },
  {
    label: 'getJsonSize',
    kind: languages.CompletionItemKind.Function,
    insertText: 'getJsonSize(${1:path})',
    insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: '根据path获取JSON数据中作为数组类型的数据的长度',
  },
  /**   * 语句   */
  {
    label: 'IF-ELSE',
    kind: languages.CompletionItemKind.Snippet,
    insertText: ['IF ${1:condition} THEN', '\t$0', 'ELSE', '\t$0', 'END'].join(
      '\n',
    ),
    insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'If-Else Statement',
  },
  {
    label: 'WHILE-DO',
    kind: languages.CompletionItemKind.Snippet,
    insertText: ['WHILE ${1:condition} DO', '\t$0', 'END'].join('\n'),
    insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'WHILE-DO Statement',
  },
];
