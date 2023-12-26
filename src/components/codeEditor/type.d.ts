export interface Suggestion {
  label: string;
  detail: string;
}

export interface Props {
  /** 编辑器内容 */
  modelValue: string;

  /** 编程语言 */
  language: 'IL' | 'C' | 'C++';

  // 语法提示关键字
  suggestions: Suggestion[];
}
