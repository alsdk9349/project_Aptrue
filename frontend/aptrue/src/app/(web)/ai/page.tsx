'use client';
import Button from '@/components/common/button/Button';
import { aiPost } from '@/api/cctvAPI';

export default function AI() {
  const handleOnclick = () => {
    aiPost();
  };
  return (
    <Button color="blue" size="webBig" onClick={handleOnclick}>
      ai 통신을 위한 버튼
    </Button>
  );
}
