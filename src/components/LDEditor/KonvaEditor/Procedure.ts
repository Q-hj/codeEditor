import Konva from 'Konva';

import { InsNetwork } from './InsNetwork';

import { Instruction } from '../type';

/** 指令参数的绘制参数 */
interface Props {
  /** domId */
  container: string;
  /** 画布宽度 */
  width: number;
  /** 画布高度 */
  height: number;
}

/** 程序 */
export class Procedure extends Konva.Stage {
  constructor(props: Props, instructList: Instruction[]) {
    super(props);

    // # 绘制矩形选中边框
    const padding = 60;

    // 创建虚线边框
    const dashLine = new Konva.Line({
      x: 0,
      y: 0,
      points: [0, 0, 50, 0, 50, 50, 0, 50], // 指定边框的点坐标
      stroke: 'black',
      strokeWidth: 2,
      closed: true,
      visible: false,
      dash: [2, 4], // 指定线段和间隙的长度
    });

    // # 绘制网络
    this.drawProcedure(instructList);

    // 点击选中效果
    this.on('click', (event) => {
      const target = event.target;

      // 如果非指令块
      if (target.parent?.attrs.name !== 'InsBlock') {
        dashLine.visible(false);
        return;
      }

      // 将选中框图形移动至当前指令块
      dashLine.moveTo(target.parent);

      // 将选中框图形移动到组的底部
      dashLine.moveToBottom();

      // 获取矩形
      const rect = target.parent.findOne('Rect');

      if (!rect) return;

      const { x, y, width, height } = rect.attrs;

      dashLine.visible(true);

      dashLine.points([
        x - padding,
        y - padding,
        x + width + padding,
        y - padding,
        x + width + padding,
        y + height + padding,
        x - padding,
        y + height + padding,
        x - padding,
        y - padding,
      ]);
    });
  }
  drawProcedure(instructList: Instruction[]) {
    this.add(new InsNetwork(instructList));

    // todo 遍历网络列表
  }
}
