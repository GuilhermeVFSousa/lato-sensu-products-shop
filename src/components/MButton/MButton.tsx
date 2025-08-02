import React from 'react';
import styles from './MButton.module.css';
import clsx from 'clsx';

type MButtonVariant = 'grey' | 'red' | 'purple' | 'yellow' | 'orange' | 'pink' | 'blue' | 'pinkellow';

type MButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  theme?: MButtonVariant;
};

export const MButton: React.FC<MButtonProps> = ({
  children,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  theme = 'grey',
}) => {
  return (
    <button
      className={clsx(styles.mbutton, styles[theme], className)}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};