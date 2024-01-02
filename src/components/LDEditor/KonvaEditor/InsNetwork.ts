import Konva from 'Konva';

import { InsBlock } from './InsBlock';

import { Instruction } from '../type';

/** 网络 */
export class InsNetwork extends Konva.Layer {
  constructor(instructList: Instruction[]) {
    super();

    this.drawInsNetwork(instructList);
  }
  drawInsNetwork(instructList: Instruction[]) {
    // 遍历指令集列表
    for (let insIndex = 0; insIndex < instructList.length; insIndex++) {
      const instruct = instructList[insIndex];

      // * 绘制各类型指令

      // 功能块
      if (instruct.InsType === 3) this.add(new InsBlock(instruct, insIndex));
    }
  }
}
