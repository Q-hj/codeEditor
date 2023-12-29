import Konva from 'Konva';

import { Instruction } from '../type';

import { InsBlock } from './InsBlock';

export class InsNetwork extends Konva.Layer {
  constructor(instructList: Instruction[]) {
    super();

    this.add(new InsBlock(instructList));
  }
}
