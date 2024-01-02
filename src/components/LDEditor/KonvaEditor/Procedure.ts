import Konva from 'Konva';

import { InsNetwork } from './InsNetwork';

import { Instruction } from '../type';

/** 指令参数的绘制参数 */
interface Props {
  /** domId */
  container: string;
  //   画布宽度
  width: number;
  //   画布高度
  height: number;
}

/** 程序 */
export class Procedure extends Konva.Stage {
  constructor(props: Props, instructList: Instruction[]) {
    super(props);

    this.drawProcedure(instructList);
  }
  drawProcedure(instructList: Instruction[]) {
    this.add(new InsNetwork(instructList));

    // todo 遍历网络列表
  }
}
