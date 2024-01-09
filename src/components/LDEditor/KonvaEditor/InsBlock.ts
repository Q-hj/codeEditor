import Konva from 'Konva';

import { InsParam, Instruction } from '@/types/Instruction';

import { blockConfig, paramsConfig } from './config';

import { Text } from './Text';

/** 指令参数的绘制参数 */
interface Props {
  /** 功能块起始坐标-X */
  startX: number;

  /** 功能块起始坐标-Y */
  startY: number;
}

/** 指令-功能块 */
export class InsBlock extends Konva.Group {
  constructor(instruct: Instruction, insIndex: number, networkIndex: number) {
    super({
      id: `InsBlock-${insIndex}`,
      name: 'InsBlock',
      draggable: true,
    });

    // # 绘制指令
    this.drawInsBlock(instruct, insIndex, networkIndex);
  }

  /** 绘制功能块 */
  drawInsBlock(instruct: Instruction, insIndex: number, networkIndex: number) {
    /** 功能块起始坐标-X */
    const startX = blockConfig.startX(insIndex);

    /** 功能块起始坐标-Y */
    const startY = blockConfig.startY(networkIndex);

    // # 绘制矩形
    const Rect = new Konva.Rect({
      x: startX,
      y: startY,
      width: blockConfig.rectWidth,
      height: blockConfig.rectHeight(instruct.ParamsNumber),
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

    // # 绘制指令标题
    this.add(
      new Konva.Text({
        x: startX,
        y: startY + 6,
        width: blockConfig.rectWidth,
        align: 'center',
        text: instruct.InsName as string,
        fontSize: 16,
        // fill: 'blue',
      }),
    );

    // # 绘制参数
    this.drawInsParams(instruct.Params, {
      startX,
      startY,
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
      const fontSize = paramsConfig.fontSize;

      /** 文字宽度 */
      const textWidth = paramsConfig.width;

      /** 基准坐标 X */
      const x = props.startX + blockConfig.rectWidth * (isLeft ? 0 : 1);

      /** 基准坐标 Y */
      const y =
        props.startY +
        blockConfig.verticalGap() +
        paramsConfig.interval * sameParamsTypeCount;

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

      const valueWidth = paramsConfig.width;

      const startX = x + (isLeft ? -(valueWidth + lineWidth) : lineWidth);

      this.add(
        new Text({
          x: startX,
          y,
          width: valueWidth,
          align: isLeft ? 'right' : 'left',
          text: '????',
          fill: 'blue',
          fontSize,
        }),
      );
    }
  }
}
