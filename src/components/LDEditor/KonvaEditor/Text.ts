import Konva from 'Konva';

import type { TextConfig } from 'Konva/lib/shapes/Text';

import useInput from '@/hooks/useInput';

const { showInput } = useInput();

/**
 * 可编辑文本
 */
export class Text extends Konva.Text {
  /**
   *
   * @param props Konva.Text的参数
   * @param input 编辑输入框
   */
  constructor(props: TextConfig) {
    super({
      x: props.x,
      y: props.y,

      //   宽度默认为矩形的宽度
      width: props.width,

      text: props.text,
      fontSize: props.fontSize || 16,
      align: props.align,
      fontFamily: props.fontFamily,
      fill: props.fill || 'blue',
    });

    // 鼠标移入
    this.on('mouseover', () => {
      document.body.style.cursor = 'pointer';
    });
    // 鼠标移除
    this.on('mouseout', () => {
      document.body.style.cursor = 'default';
    });

    // 双击
    this.on('dblclick', () => {
      const { x, y, width } = this.getClientRect();

      const { align } = this.getAttrs();

      // 显示编辑框
      showInput(this, x, y, width, align);
    });
  }
}
