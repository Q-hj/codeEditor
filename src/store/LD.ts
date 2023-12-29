import Konva from 'Konva';
import { defineStore } from 'pinia';

interface State {
  currentKonvaText: Konva.Text | null;
}

const useLDStore = defineStore({
  id: 'LD',
  state: (): State => ({
    /** 选中的参数文本 */
    currentKonvaText: null,
  }),
  getters: {},
  actions: {
    setKonvaText(konvaText: Konva.Text) {
      this.currentKonvaText = konvaText;
    },
  },
});

export { useLDStore as default };
