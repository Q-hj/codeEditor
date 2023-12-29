import Konva from 'Konva';

import { Instruction } from '../type';

import { InsParams } from './InsParams';

export class InsBlock extends Konva.Group {
  constructor(instructList: Instruction[]) {
    super({
      draggable: true,
    });
    this.drawInsBlock(instructList);
  }

  drawInsBlock(instructList: Instruction[]) {
    /** 矩形宽度 */
    const rectWidth = 180;

    /** 矩形间隔(水平) */
    const rectGap = 180;

    /** 参数间隔(垂直) */
    const interval = 80;

    /** 参数距离顶部和底部的距离 */
    const verticalGap = interval / 2;

    // 遍历指令集列表
    for (let insIndex = 0; insIndex < instructList.length; insIndex++) {
      const instruct = instructList[insIndex];
      if (instruct.InsType !== 3) continue;

      // 功能块起始坐标
      const startX = 100 + insIndex * (rectWidth + rectGap);
      const startY = 100;

      const rectHeight = (interval / 2) * instruct.ParamsNumber + verticalGap;

      // 绘制矩形
      const Rect = new Konva.Rect({
        x: startX,
        y: startY,
        width: rectWidth,
        height: rectHeight,
        stroke: 'black',
        strokeWidth: 1,
      });
      this.add(Rect);

      // 绘制标题
      this.add(
        new Konva.Text({
          x: startX,
          y: startY - 18,
          width: rectWidth,
          align: 'center',
          text: instruct.InsName as string,
          fontSize: 16,
          fill: 'blue',
        }),
      );

      // 绘制参数
      this.add(
        new InsParams(instruct.Params, {
          startX,
          startY,
          rectWidth,
          verticalGap,
          interval,
        }),
      );

      // todo 绘制链接线
    }
  }
}
