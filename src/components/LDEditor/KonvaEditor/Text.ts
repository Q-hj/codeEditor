import Konva from 'Konva';

import type { TextConfig } from 'Konva/lib/shapes/Text';

/**
 * 可编辑文本
 */
export class Text extends Konva.Text {
  /**
   *
   * @param props Konva.Text的参数
   * @param rect 附着的矩形
   * @param input 编辑输入框
   */
  constructor(
    props: TextConfig,
    rect: Konva.Rect,
    input: HTMLInputElement,
    fn: (text: Konva.Text) => void,
  ) {
    super({
      x: props.x,
      y: props.y,

      //   宽度默认为矩形的宽度
      width: props.width || rect.attrs.width,

      text: props.text,
      fontSize: props.fontSize || 16,
      align: props.align,
      fontFamily: props.fontFamily,
      fill: props.fill || 'blue',
    });
    this.on('mouseover', () => {
      document.body.style.cursor = 'pointer';
    });
    this.on('mouseout', () => {
      document.body.style.cursor = 'default';
    });
    this.on('dblclick', () => {
      const { x, y, width, align } = this.attrs;
      input.hidden = false;
      input.style.left = x + 'px';
      input.style.top = y - 8 + 'px';
      input.style.width = width + 'px';
      input.style.textAlign = align === 'right' ? 'center' : align;
      input.value = this.text() === '????' ? '' : this.text();
      input.focus();
      if (fn) fn(this);
    });
  }
}

// todo 标题、 功能块参数输入 extends Text
