import LoginForm from '@/components/login/LoginForm';
import { Suspense } from 'react';
import styles from './page.module.scss';
import PenTrue from '@/components/common/loadingSpinner/penTrue';

export default function Page() {
  return (
    <>
      <Suspense fallback={<PenTrue />}>
        <LoginForm />
      </Suspense>
    </>
  );
}
