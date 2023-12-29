import Konva from 'Konva';

import { InsParam } from '../type';

import { Text } from './Text';

interface Props {
  startX: number;
  startY: number;
  rectWidth: number;
  verticalGap: number;
  interval: number;
}

export class InsParams extends Konva.Group {
  constructor(instructList: InsParam[] | null, props: Props) {
    super({
      draggable: true,
    });

    if (instructList) this.drawInsParams(instructList, props);
  }

  drawInsParams(instruct: InsParam[], props: Props) {
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
