import Konva from 'Konva';

import { InsBlock } from './InsBlock';

import { LdData } from '@/types/ldData';

import { NetworkCommnet } from './NetworkCommnet';

import { blockConfig, networkConfig } from './config';

interface INetwork {
  /** 舞台 */
  stage: Konva.Stage;

  /** 网络数据 */
  network: LdData;

  /** 网络索引 */
  networkIndex: number;
}

/** 网络 */
export class InsNetwork extends Konva.Group implements INetwork {
  networkIndex: number;
  network: LdData;

  stage: Konva.Stage;

  constructor(network: LdData, networkIndex: number, stage: Konva.Stage) {
    super({
      y: networkIndex * networkConfig.height(),
    });

    this.stage = stage;

    this.network = network;

    this.networkIndex = networkIndex;

    this.drawInsNetwork();
  }

  /** 绘制网络 */
  drawInsNetwork() {
    const network = this.network;

    const networkIndex = this.networkIndex;

    // * 绘制注释
    // todo 可见区域渲染
    this.add(new NetworkCommnet(networkIndex));

    /** 画布宽度 */
    const stageWidth = this.stage.width();

    /** 画布水平坐标 */
    const x = this.stage.x();

    /** 最小临界值 */
    const minX = x ? -x : 0;
    /** 最大临界值 */
    const maxX = minX + stageWidth;

    // * 遍历指令集列表
    for (let insIndex = 0; insIndex < network.content.length; insIndex++) {
      const instruct = network.content[insIndex];

      /** 指令块起始X坐标 */
      const startX = blockConfig.width() * insIndex;
      /** 指令块结束X坐标 */
      const endX = blockConfig.width() * (insIndex + 1);

      /** 是否在水平边界内 */
      const flagX = startX < maxX && endX > minX;

      if (!flagX) continue;

      // * 绘制各类型指令

      // 3 功能块
      if (instruct.InsType === 3)
        this.add(new InsBlock(instruct, insIndex, networkIndex));
    }
  }
}
