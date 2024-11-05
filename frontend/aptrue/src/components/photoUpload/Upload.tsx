'use client';

import { useRef, useState } from 'react';
import style from './Upload.module.scss';
import Button from '../common/button/Button';

export default function Upload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  // 클릭 핸들러
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 파일 입력 요소 클릭
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // 최대 9개까지만 추가
      const newPreviews = Array.from(files).map((file) =>
        URL.createObjectURL(file),
      );
      setPreviews((prev) => {
        const combinedPreviews = [...prev, ...newPreviews];
        return combinedPreviews.slice(0, 9); // 최대 9개까지만 유지
      });
    }
  };

  // 이미지 삭제 핸들러
  const handleRemoveImage = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUploadClick = () => {
    console.log(previews);
  };

  return (
    <div className={style.uploadContainer}>
      <div className={style.previews}>
        {previews.map((preview, index) => (
          <div key={index} className={style.previewWrapper}>
            <img
              src={preview}
              alt={`Preview ${index}`}
              className={style.previewImage}
            />
            <div
              className={style.deleteButton}
              onClick={() => handleRemoveImage(index)}
            >
              x
            </div>
          </div>
        ))}
        {previews.length < 9 && ( // 9개 미만일 때만 업로드 버튼 표시
          <div
            className={previews.length === 0 ? style.upload : style.uploadSmall}
            onClick={handleClick}
          >
            <img
              src="/icons/camera.png"
              alt="Upload"
              className={style.uploadIcon}
            />
          </div>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        multiple
        style={{ display: 'none' }} // 파일 입력 요소 숨기기
        onChange={handleFileChange}
      />
      <div className={style.button}>
        <Button
          size="appBig"
          color={previews.length >= 5 ? 'blue' : 'gray'}
          onClick={handleUploadClick}
        >
          완료
        </Button>
      </div>
    </div>
  );
}
