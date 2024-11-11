// src/state/atoms/webrtcAtoms.ts
import { atom } from 'recoil';
import { Publisher } from 'openvidu-browser';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const publisherState = atom<Publisher | null>({
  key: 'publisherState',
  default: null,
  // effects_UNSTABLE: [persistAtom],
});

export const sessionIdState = atom<string | null>({
  key: 'sessionIdState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const webSessionSate = atom<string | null>({
  key: 'webSessionSate',
  default: null,
});

// 비디오 요소 저장용 Atom 추가
export const videoElementState = atom<HTMLVideoElement | null>({
  key: 'videoElementState',
  default: null,
  // effects_UNSTABLE: [persistAtom],
});

// MediaStream 저장용 Atom 추가
export const videoStreamState = atom<MediaStream | null>({
  key: 'videoStreamState',
  default: null,
  // effects_UNSTABLE: [persistAtom],
});
