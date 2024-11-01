'use client';
import style from '@/components/common/button/Button.module.scss';
import { useEffect, useState } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color: ButtonColor;
  size: ButtonSize;
  clickedColor?: ButtonColor;
}

export default function Button({
  size,
  color,
  children,
  clickedColor,
  ...props
}: ButtonProps) {
  const [currentColor, setCurrentColor] = useState<ButtonColor>(color);
  const [colorState, setColorState] = useState<boolean>(true);

  const onClick = async () => {
    if (clickedColor) {
      setCurrentColor(colorState === true ? clickedColor : color);
      setColorState(!colorState);
    }
  };
  return (
    <button
      className={`${style['base-button-style']} ${style[currentColor]} ${style[size]}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
