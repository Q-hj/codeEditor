<script setup lang="ts" name="KonvaEditor">
import Konva from 'Konva';
import { onMounted } from 'vue';

import { Text } from './Text';

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

  //一个group代表一个指令集，包含文字、线条、矩形等
  const group = new Konva.Group({
    // draggable: true,
  });

  // 绘制矩形
  const Rect = new Konva.Rect({
    x: 100,
    y: 100,
    width: 180,
    height: (4 * 100) / 2,
    stroke: 'black',
    strokeWidth: 1,
  });

  // add the shape to the layer
  group.add(Rect);

  group.add(
    new Text(
      {
        x: 100,
        y: 100 - 18,
        align: 'center',
        text: '指令一',
      },
      Rect,
      input,
      (Text) => (currentText = Text),
    ),
  );

  for (let i = 0; i < 4; i++) {
    const isLeft = i % 2 === 0;
    group.add(
      new Text(
        {
          x: isLeft ? 100 - 180 : 100 + 180,
          y: 100 + 50 + 100 * parseInt(i / 2 + ''),
          align: i % 2 === 0 ? 'right' : 'left',
          text: `参数${i}`,
        },
        Rect,
        input,
        (Text) => (currentText = Text),
      ),
    );
  }

  // add the layer to the stage

  layer.add(group);
  stage.add(layer);

  // draw the image
  // layer.draw();
});
</script>

<template>
  <section class="relative">
    <input
      id="input"
      type="text"
      hidden
      class="absolute z100 px10 px5"
      @keyup.enter="updateText"
      @blur="updateText"
    />
    <div id="container" wfull></div>
  </section>
</template>
