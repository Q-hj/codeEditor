import Konva from 'Konva';

import { InsNetwork } from './InsNetwork';

import { LdData } from '@/types/ldData';

/** 画布基本配置 */
export const drawConfig = {
  /** 单元格宽度 */
  rowWidth: 40,
  /** 单元格高度 */
  rowHeight: 20,

  /** 最大行数 */
  maxRow: 800,
  /** 最大列数 */
  maxCol: 40,
};

/** network绘制配置 */
export const networkConfig = {
  /** 注释高度 */
  commentHeight: 40,
  /** 内容高度 */
  contentHeight: drawConfig.rowHeight * 10,
  /** 总高度 */
  height: function () {
    return this.contentHeight + this.commentHeight;
  },
  /** 块宽度 */
  blockWidth: 180,
};

/** 指令参数的绘制参数 */
interface ProcedureProps {
  /** domId */
  container: string;
  /** 画布宽度 */
  width: number;
  /** 画布高度 */
  height: number;
}

/** 梯形图程序 */
export class Procedure extends Konva.Stage {
  constructor(props: ProcedureProps, ldData: LdData[]) {
    super(props);

    // # 绘制矩形选中边框
    this.creatDashedBorder();

    // # 绘制网络
    this.drawProcedure(ldData);

    // # 绘制垂直滚动条
    // drawVerticalBar(this, ldData.length);
  }
  drawProcedure(ldData: LdData[]) {
    // * 遍历网络列表
    for (let index = 0; index < ldData.length; index++) {
      const network = ldData[index];

      this.add(new InsNetwork(network, index));
    }
  }

  /** 创建选中边框 并绑定事件 */
  creatDashedBorder() {
    const paddingX = 80;
    const paddingY = 10;

    // 创建虚线边框
    const dashLine = new Konva.Line({
      x: 0,
      y: 0,
      points: [0, 0, 50, 0, 50, 50, 0, 50], // 指定边框的点坐标
      stroke: '#007acc',
      strokeWidth: 2,
      closed: true,
      visible: false,
      dash: [2, 2], // 指定线段和间隙的长度
    });

    // 点击选中效果
    this.on('click', (event) => {
      const target = event.target;

      // 如果非指令块
      if (target.parent?.attrs.name !== 'InsBlock') {
        dashLine.visible(false);
        return;
      }

      // 将选中框图形移动至当前指令块
      dashLine.moveTo(target.parent);

      // 获取矩形
      const rect = target.parent.findOne('Rect');

      if (!rect) return;

      const { x, y, width, height } = rect.attrs;

      dashLine.visible(true);

      dashLine.points([
        x - paddingX,
        y - paddingY,
        x + width + paddingX,
        y - paddingY,
        x + width + paddingX,
        y + height + paddingY,
        x - paddingX,
        y + height + paddingY,
        x - paddingX,
        y - paddingY,
      ]);

      // 将选中框图形移动到组的底部
      dashLine.moveToBottom();
    });
  }
}

/** 绘制垂直滚动条 */
function drawVerticalBar(stage: Konva.Stage, networkNum: number) {
  const scrollLayers = new Konva.Layer();
  stage.add(scrollLayers);

  /** 滚动条宽度 */
  const scrollBarWidth = 10;

  /** 滚动条高度 */
  const scrollBarHeight =
    (stage.height() / (networkConfig.height() * networkNum)) * stage.height();

  /** 滚动条坐标X */
  const scrollBarX = stage.width() - scrollBarWidth;

  const verticalBar = new Konva.Rect({
    width: scrollBarWidth,
    height: scrollBarHeight,
    fill: 'grey',
    opacity: 0.8,
    x: scrollBarX,
    y: 0,
    draggable: true,
    dragBoundFunc: function ({ y }) {
      /** 最小值限制 */
      const minY = Math.min(y, stage.height() - this.height());

      /** 滚动条当前Y坐标 */
      const scrollBarY = Math.max(minY, 0);

      /** 滚动条实际可滚动区域 */
      const availableHeight = stage.height() - verticalBar.height();

      /**
       * # 方程式
       * # 画布Y坐标 / 画布高度 = 滚动条Y坐标 / 滚动条可滚动高度
       * 左右比率相等
       */

      /** 比率：滚动条Y坐标/滚动条可滚动高度 */
      const delta = scrollBarY / availableHeight;

      /** stageY坐标 */
      const stageY = stage.height() * delta;

      stage.y(-stageY * 2); //stage向上偏移时，会抵消内部的滚动条向下的偏移量，所以需要 *2

      return {
        x: scrollBarX,
        y: scrollBarY,
      };
    },
  });

  scrollLayers.add(verticalBar);
}
