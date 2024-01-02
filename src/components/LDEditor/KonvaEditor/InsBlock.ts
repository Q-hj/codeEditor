import Konva from 'Konva';

import { InsParam, Instruction } from '../type';

import { Text } from './Text';

/** 指令参数的绘制参数 */
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

    // 点击选中
    this.on('click', () => {
      // document.body.style.cursor = 'pointer';
    });
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

    /** 功能块起始坐标-X */
    const startX = 100 + insIndex * (rectWidth + rectGap);

    /** 功能块起始坐标-Y */
    const startY = 100;

    const rectHeight = (interval / 2) * instruct.ParamsNumber + verticalGap;

    // # 绘制矩形
    const Rect = new Konva.Rect({
      x: startX,
      y: startY,
      width: rectWidth,
      height: rectHeight,
      stroke: 'black',
      strokeWidth: 1,
    });

    // 鼠标移入
    Rect.on('mouseover', () => {
      document.body.style.cursor = 'move';
    });
    // 鼠标移除
    Rect.on('mouseout', () => {
      document.body.style.cursor = 'default';
    });
    this.add(Rect);

    // # 绘制标题
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

    // # 绘制参数
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

    // * 绘制参数
    for (let paramsIndex = 0; paramsIndex < instruct.length; paramsIndex++) {
      const params = instruct[paramsIndex];

      if (lastParamsType === params.ParamType) sameParamsTypeCount++;
      else sameParamsTypeCount = 0;

      lastParamsType = params.ParamType;

      const isLeft = params.ParamType === 1;

      /** 文字大小 */
      const fontSize = 16;

      /** 文字宽度 */
      const textWidth = 50;

      /** 基准坐标 X */
      const x = props.startX + props.rectWidth * (isLeft ? 0 : 1);

      /** 基准坐标 Y */
      const y =
        props.startY + props.verticalGap + props.interval * sameParamsTypeCount;

      /** 文本坐标X */
      const textX = x + (isLeft ? 10 : -10 - textWidth);

      // # 绘制参数名
      this.add(
        new Konva.Text({
          x: textX,
          y,
          width: textWidth,
          align: isLeft ? 'left' : 'right',
          text: params.ParamName as string,
          fontSize: 16,
        }),
      );

      // # 绘制参数指示线

      const lineWidth = 10;
      const lineX = x + (isLeft ? -lineWidth : 0);
      const lineY = y + fontSize / 2 - 2;

      this.add(
        new Konva.Line({
          points: [lineX, lineY, lineX + lineWidth, lineY],
          stroke: 'black',
          strokeWidth: 4,
        }),
      );

      // # 绘制可编辑参数

      const valueWidth = 100;

      const valueX = x + (isLeft ? -(valueWidth + lineWidth) : lineWidth);

      this.add(
        new Text({
          x: valueX,
          y,
          width: valueWidth,
          align: isLeft ? 'right' : 'left',
          text: '????',
          fill: 'blue',
          fontSize: 16,
        }),
      );
    }
  }

  /** 绘制边框 */
  drawBorder() {}
}
