import Konva from 'Konva';

import { InsBlock } from './InsBlock';

import { LdData } from '@/types/ldData';

import { blockConfig, drawConfig, networkConfig } from './config';

interface INetwork {
  stage: Konva.Stage | null;
  /** 网络数据 */
  network: LdData;

  /** 网络索引 */
  networkIndex: number;
}

/** 网络 */
export class InsNetwork extends Konva.Layer implements INetwork {
  networkIndex: number;
  network: LdData;

  stage: Konva.Stage | null;

  constructor(
    network: LdData,
    networkIndex: number,
    stage: Konva.Stage | null,
  ) {
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
    // this.add(new NetworkCommnet(networkIndex));

    // const visibleGroups = [];

    // 遍历指令集列表
    for (let insIndex = 0; insIndex < network.content.length; insIndex++) {
      const instruct = network.content[insIndex];

      // todo 跳过绘制显示区域外的指令
      if (!this.isVisibleArea(insIndex)) continue;
      // * 绘制各类型指令

      // 功能块
      if (instruct.InsType === 3)
        this.add(new InsBlock(instruct, insIndex, networkIndex));
    }
  }

  /** 是否在可见区域内 */
  isVisibleArea(insIndex: number) {
    const state = this.stage;

    /** 画布初始宽度 */
    const defaultWidth = drawConfig.width;
    const defaultHeight = drawConfig.height;

    /** 指令起始坐标 */
    const insX = blockConfig.width() * insIndex;
    const insY = networkConfig.height() * this.networkIndex;

    const { x, y } = state?.getClientRect() || {};

    // console.log(x);

    //-1: x最小值为-0.5 ？

    // 缓冲值
    const bufferValue = 100;

    const minX = x ? -x - bufferValue : 0;
    const minY = y ? -y - bufferValue : 0;
    const maxX = minX + defaultWidth + bufferValue;
    const maxY = minY + defaultHeight + bufferValue;

    // console.log(minX);
    // console.log(maxX);

    if (insIndex) {
      // console.log(insY);
      // console.log(insX >= minX && insX <= maxX);
    }
    /** 是否在水平坐标内 */
    const flagX = insX >= minX && insX <= maxX;
    /** 是否在垂直坐标内 */
    const flagY = insY >= minY && insY <= maxY;
    return flagX;
  }

  /** 重新绘制网络内容 */
  redraw(stage: Konva.Stage) {
    this.stage = stage;
    // for (let index = 0; index < this.children.length; index++) {
    //   const group = this.children[index];
    //   group.remove();
    // }
    // console.log(this.children);
    // this.clear({
    //   x: 0,
    //   y: 0,
    //   width,
    //   height,
    // });
    // this.drawInsNetwork();
    // stage.batchDraw();
  }
}
