import Konva from 'Konva';

import { InsParam, Instruction } from '../type';

import { Text } from './Text';

interface Props {
  startX: number;
  startY: number;
  rectWidth: number;
  verticalGap: number;
  interval: number;
}

/** 指令-功能块 */
export class InsBlock extends Konva.Group {
  constructor(instruct: Instruction, insIndex: number) {
    super({
      draggable: true,
    });
    this.drawInsBlock(instruct, insIndex);
  }

  drawInsBlock(instruct: Instruction, insIndex: number) {
    /** 矩形宽度 */
    const rectWidth = 180;

    /** 矩形间隔(水平) */
    const rectGap = 180;

    /** 参数间隔(垂直) */
    const interval = 80;

    /** 参数距离顶部和底部的距离 */
    const verticalGap = interval / 2;

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
    this.drawInsParams(instruct.Params, {
      startX,
      startY,
      rectWidth,
      verticalGap,
      interval,
    });

    // todo 绘制链接线
  }

  /** 绘制参数 */
  drawInsParams(instruct: InsParam[] | null, props: Props) {
    if (!instruct) return;

    // 上一个参数类型
    let lastParamsType = 0;

    // 同一类型参数的下标
    let sameParamsTypeCount = 0;

    // 绘制参数
    for (let paramsIndex = 0; paramsIndex < instruct.length; paramsIndex++) {
      const params = instruct[paramsIndex];

      if (lastParamsType === params.ParamType) sameParamsTypeCount++;
      else sameParamsTypeCount = 0;

      lastParamsType = params.ParamType;

      const isLeft = params.ParamType === 1;
      this.add(
        new Text({
          x: props.startX + props.rectWidth * (isLeft ? -1 : 1),
          y:
            props.startY +
            props.verticalGap +
            props.interval * sameParamsTypeCount,
          width: props.rectWidth,
          align: isLeft ? 'right' : 'left',
          text: params.ParamName as string,
        }),
      );
    }
  }
}
