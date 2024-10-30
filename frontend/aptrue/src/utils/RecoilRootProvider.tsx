// 클라이언트 컴포넌트로 변경하지 않으면 recoil 사용 시 에러가 뜸
"use client";
import { RecoilRoot } from "recoil";

export default function RecoilRootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
