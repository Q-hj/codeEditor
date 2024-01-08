/** 画布基本配置 */
export const drawConfig = {
  /** 画布宽度 */
  width: 0,
  /** 画布高度 */
  height: 0,

  /** 单元格宽度 */
  rowWidth: 40,
  /** 单元格高度 */
  rowHeight: 20,

  /** 最大列数 */
  maxCol: 40,
  /** 最大行数 */
  maxRow: 800,

  /** 画布内容宽度 */
  contentWidth: function () {
    return this.maxCol * this.rowWidth;
  },
  /** 画布内容高度 */
  contentHeight: function () {
    return this.maxRow * this.rowHeight;
  },
};

/** network绘制配置 */
export const networkConfig = {
  /** 注释高度 */
  commentHeight: 40,

  /** 内容高度 */
  contentHeight: drawConfig.rowHeight * 10, //暂时固定为10个单元格高度

  /** 总宽度 */
  width: function () {
    return drawConfig.contentWidth();
  },
  /** 总高度 */
  height: function () {
    return this.contentHeight + this.commentHeight;
  },
};

/** 功能块绘制配置 */
export const blockConfig = {
  /** 矩形宽度 */
  rectWidth: 180,

  /** 矩形水平内边距 */
  paddingX: 90,

  width: function () {
    return this.rectWidth + this.paddingX * 2;
  },

  /**
   * 起始坐标X
   * @param insIndex 功能块索引
   */
  startX: function (insIndex: number) {
    return insIndex * this.width();
  },

  /** 参数间隔(垂直) */
  interval: 80,

  /** 参数距离顶部和底部的距离 */
  verticalGap: function () {
    return this.interval / 2;
  },

  /**
   * 起始坐标Y
   * @param networkIndex 网络索引
   */
  startY: function (networkIndex?: number) {
    return 50; //+ networkIndex * 400
  },
};
