import Konva from 'Konva';

import { InsBlock } from './InsBlock';

import { NetworkCommnet } from './NetworkCommnet';

import { LdData } from '@/types/ldData';

import { networkConfig } from './Procedure';

/** 网络 */
export class InsNetwork extends Konva.Layer {
  constructor(network: LdData, networkIndex: number) {
    super({
      y: networkIndex * networkConfig.height(),
    });

    this.drawInsNetwork(network, networkIndex);
  }
  drawInsNetwork(network: LdData, networkIndex: number) {
    // * 绘制注释
    this.add(new NetworkCommnet(networkIndex));
    // 遍历指令集列表
    for (let insIndex = 0; insIndex < network.content.length; insIndex++) {
      const instruct = network.content[insIndex];

      // todo 跳过绘制显示区域外的指令
      // if() continue
      // * 绘制各类型指令

      // 功能块
      if (instruct.InsType === 3)
        this.add(new InsBlock(instruct, insIndex, networkIndex));
    }
  }
}
