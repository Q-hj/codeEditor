import { defineStore } from 'pinia';

import { Instruction } from '@/types/Instruction';

import instructions from './instructionList';

interface AppState {
  instructions: Instruction[];
}

export const useAppStore = defineStore({
  id: 'LD',
  state: (): AppState => ({
    instructions,
  }),
  getters: {},
  actions: {},
});

export { useAppStore as default };
