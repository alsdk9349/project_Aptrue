import { Suspense } from 'react';
import ChangePasswordForm from '@/components/login/ChangePasswordForm';
import PenTrue from '@/components/common/loadingSpinner/penTrue';

export default function Page() {
  return (
    <>
      <Suspense fallback={<PenTrue />}>
        <ChangePasswordForm />
      </Suspense>
    </>
  );
}
