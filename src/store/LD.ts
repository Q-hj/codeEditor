import Konva from 'Konva';
import { defineStore } from 'pinia';

interface State {
  currentKonvaText: Konva.Text | null;
  // isInsSelected: boolean;
}

const useLDStore = defineStore({
  id: 'LD',
  state: (): State => ({
    /** 选中的参数文本 */
    currentKonvaText: null,

    /** 是否选中指令 */
    // isInsSelected: false,
  }),
  getters: {},
  actions: {
    setKonvaText(konvaText: Konva.Text) {
      this.currentKonvaText = konvaText;
    },
    // setIsInsSelected(isSelect: boolean) {
    //   this.isInsSelected = isSelect;
    // },
  },
});

export { useLDStore as default };
