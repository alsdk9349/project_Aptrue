import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist', // localStorage에 저장될 키
  storage: localStorage,
});

export const detectionState = atom({
  key: 'detectionState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
