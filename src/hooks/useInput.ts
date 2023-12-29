import Konva from 'Konva';

import useLDStore from '@/store/LD';

/** 全局输入框 */
function useInput() {
  /**
   * 展示输入框
   * @param konvaText 选中的文本
   * @param x 文本的X轴坐标
   * @param y 文本的Y轴坐标
   * @param width 文本的宽度
   * @param align 文本的对齐方式
   */
  const showInput = (
    konvaText: Konva.Text,
    x: number,
    y: number,
    width: number,
    align: 'left' | 'center' | 'right',
  ) => {
    const input = document.querySelector('#paramsInput') as HTMLInputElement;

    if (!input) return;

    const value = konvaText.text();

    input.hidden = false;
    input.style.left = x + 'px';
    input.style.top = y - 8 + 'px';
    input.style.width = width - 10 - 3 + 'px';
    input.style.textAlign = align === 'right' ? 'center' : align;
    input.value = value === '????' ? '' : value;
    input.focus();

    const { setKonvaText } = useLDStore();

    setKonvaText(konvaText);
  };

  // const rules = [];

  /** 输入框内容改变 */
  const handleInputChange = ({ target }: Event) => {
    const { value } = target as HTMLInputElement;
    console.log(value);
    //校验

    const input = document.querySelector('#paramsInput') as HTMLInputElement;
    input.hidden = true;

    const { currentKonvaText } = useLDStore();

    currentKonvaText?.text(value);
  };

  return { showInput, handleInputChange };
}

export { useInput as default };
