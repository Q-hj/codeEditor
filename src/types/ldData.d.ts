import { Instruction } from '@/types/Instruction';

export interface LdData {
  /** 网络名称 */
  // name?: string;

  /** 网络注释 */
  comment?: string;

  /** 网络内容 */
  content: Partial<Instruction>[];
}
