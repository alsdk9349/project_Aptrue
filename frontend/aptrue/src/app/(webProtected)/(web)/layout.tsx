import { ReactNode, Suspense } from 'react';
import WebNav from '@/components/common/navbar/WebNav';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <WebNav />
      </Suspense>

      {children}
    </div>
  );
}
