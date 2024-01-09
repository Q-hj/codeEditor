# codeEditor

## 自定义编程语言

### 代码高亮

> 可通过 languages.setMonarchTokensProvider 为对应语言进行代码高亮配置

### 语法提示

> 可通过 languages.registerCompletionItemProvider 为对应语言进行代码提示配置。

## 功能

- 编辑器

  - 主题切换
  - 语言切换
  - 字体大小调整
  - 分屏（待做）
  - 跳转到指定行数（待做）

- 编程语言
  - 代码高亮
  - 代码提示
  - 代码格式化（待做）
  - 语法校验（待做）
  - 悬浮提示（待做）

# LD编辑器

层级：

Procedure（程序）

> 对应Konva.Stage，包含一个Konva.Layer（图层）

- Network

> 对应Konva.Layer

- InsBlock （功能块）

  > 对应Konva.Group

  - InsParmas （参数列表）

    - InsText （可编辑文本）
      > 对应Konva.Text

  - 连接线

- InsCoil （线圈）
  - 连接线
- InsContact （触点）
  - 连接线

## 功能

- 内容滚动

- 可视区域渲染

- 拖拽

- 选中效果
