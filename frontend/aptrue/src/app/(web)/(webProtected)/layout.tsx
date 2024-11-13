import { ReactNode, Suspense } from 'react';
import WebNav from '@/components/common/navbar/WebNav';
import Headerbar from '@/components/common/header/Headerbar';
import PenTrue from '@/components/common/loadingSpinner/penTrue';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={<PenTrue/>}>
        <Headerbar/>
        <WebNav />
      </Suspense>

      {children}
    </>
  );
}
