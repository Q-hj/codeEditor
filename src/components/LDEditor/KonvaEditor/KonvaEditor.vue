<script setup lang="ts" name="KonvaEditor">
import Konva from 'Konva';
import { onMounted } from 'vue';

import { Text } from './Text';

// import { Instruction } from '../type';

import instructList from '../instructList.json';

console.log(instructList);

let currentText: Konva.Text;

let input: HTMLInputElement;

const updateText = () => {
  currentText.text(input.value || '????');
  input.hidden = true;
};

onMounted(() => {
  input = document.getElementById('input') as HTMLInputElement;

  // first we need to create a stage
  const stage = new Konva.Stage({
    container: 'container',
    width: 1000,
    height: 1500,
  });

  const layer = new Konva.Layer({
    // draggable: true,
  });

  /** 矩形宽度 */
  const rectWidth = 180;

  /** 矩形间隔(水平) */
  const rectGap = 180;

  /** 参数间隔(垂直) */
  const interval = 80;

  /** 参数距离顶部和底部的距离 */
  const verticalGap = interval / 2;

  // 遍历指令集列表
  for (let insIndex = 0; insIndex < instructList.length; insIndex++) {
    const instruct = instructList[insIndex];
    if (instruct.InsType !== 3) continue;

    // 功能块起始坐标
    const startX = 100 + insIndex * (rectWidth + rectGap);
    const startY = 100;

    const group = new Konva.Group({
      draggable: true,
    });

    layer.add(group);

    const rectHeight = (interval / 2) * instruct.ParamsNumber + verticalGap;

    // 绘制矩形
    const Rect = new Konva.Rect({
      x: startX,
      y: startY,
      width: rectWidth,
      height: rectHeight,
      stroke: 'black',
      strokeWidth: 1,
    });
    group.add(Rect);

    // 绘制标题
    group.add(
      new Text(
        {
          x: startX,
          y: startY - 18,
          width: rectWidth,
          align: 'center',
          text: instruct.InsName,
        },
        input,
        (Text) => (currentText = Text),
      ),
    );

    // 上一个参数类型
    let lastParamsType = 0;

    // 同一类型参数的下标
    let sameParamsTypeCount = 0;

    // 绘制参数
    for (
      let paramsIndex = 0;
      paramsIndex < instruct.Params.length;
      paramsIndex++
    ) {
      const params = instruct.Params[paramsIndex];

      if (lastParamsType === params.ParamType) sameParamsTypeCount++;
      else sameParamsTypeCount = 0;

      lastParamsType = params.ParamType;

      const isLeft = params.ParamType === 1;
      group.add(
        new Text(
          {
            x: startX + rectWidth * (isLeft ? -1 : 1),
            y: startY + verticalGap + interval * sameParamsTypeCount,
            width: rectWidth,
            align: isLeft ? 'right' : 'left',
            text: params.ParamName as string,
          },

          input,
          (Text) => (currentText = Text),
        ),
      );
    }
  }

  stage.add(layer);
});
</script>

<template>
  <section class="relative">
    <input
      id="input"
      type="text"
      hidden
      class="absolute z100 px5"
      @keyup.enter="updateText"
      @blur="updateText"
    />
    <div id="container" wfull></div>
  </section>
</template>
