// key 값은 selector의 고유한 식별자, get은 selector의 값을 계산하는 함수 정의
// 현재 상태의 snapshot에서 다른 atoms의 값을 읽을 때 get 함수를 인자로 받음
// 참고 : https://velog.io/@hyeonbinnn/Recoil-%EB%A6%AC%EC%BD%94%EC%9D%BC%EB%A1%9C-%EC%83%81%ED%83%9C-%EA%B4%80%EB%A6%AC-%EB%A0%88%EA%B3%A0

import { selector } from "recoil";
import { countState } from "../atoms/atoms";

export const changeCountState = selector({
  key: "changeCountState",
  get: ({ get }) => {
    const count = get(countState);
    return count.toLocaleString;
  },
});
