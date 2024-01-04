import { defineStore } from 'pinia';

import { Instruction } from '@/types/Instruction';

import { LdData } from '@/types/ldData';

import instructions from './instructionList';

interface AppState {
  instructions: Instruction[];
  ldData: LdData[];
}

const network = {
  // name: 'network1',
  comment: '网络注释',
  content: [
    {
      InsId: 5,
      InsName: 'NCR',
      InsType: 3,
      ParamsNumber: 2,
      Params: [
        {
          InsParamId: 5,
          ParamName: 'IN',
          ParamType: 1644081153,
          InsId: 5,
        },
        {
          InsParamId: 6,
          ParamName: 'Q',
          ParamType: 1644081153,
          InsId: 5,
        },
      ],
    },
    {
      InsId: 80,
      InsName: '-(JMP)',
      InsType: 2,
      InsGroup: 7,
      ParamsNumber: 1,
      Params: [
        {
          InsParamId: 289,
          ParamName: '',
          ParamType: 1024,
          InsId: 80,
        },
      ],
    },
  ],
};

const ldData: LdData[] = [];

for (let index = 0; index < 10; index++) {
  const content = [];
  for (let j = 0; j < 10; j++) {
    content.push({
      InsId: 5,
      InsName: 'NCR',
      InsType: 3,
      ParamsNumber: 2,
      Params: [
        {
          InsParamId: 5,
          ParamName: 'IN',
          ParamType: 1644081153,
          InsId: 5,
        },
        {
          InsParamId: 6,
          ParamName: 'Q',
          ParamType: 1644081153,
          InsId: 5,
        },
      ],
    });
  }

  ldData.push({
    comment: '网络注释',
    content,
  });
}

export const useAppStore = defineStore({
  id: 'LD',
  state: (): AppState => ({
    instructions,
    ldData,
  }),
  getters: {},
  actions: {},
});

export { useAppStore as default };
