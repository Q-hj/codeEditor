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
    super(props);

    // 鼠标移入
    this.on('mouseover', () => {
      document.body.style.cursor = 'pointer';
    });
    // 鼠标移除
    this.on('mouseout', () => {
      document.body.style.cursor = 'default';
    });

    // 双击
    // this.on('dblclick', (event) => {
    //   const { x, y } = this.getClientRect();
    // });

    // 点击事件
    this.on('click', () => {
      const { x, y } = this.getClientRect();

      const stageX = this.getStage()?.x() || 0;
      const stageY = this.getStage()?.y() || 0;

      const { align } = this.getAttrs();

      // 显示编辑框
      showInput(this, x - stageX, y - stageY, align);
    });
  }
}
