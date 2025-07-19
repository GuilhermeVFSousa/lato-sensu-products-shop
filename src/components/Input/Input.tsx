import React from 'react';
import styles from './Input.module.css';
import clsx from 'clsx';

type InputType = 'text' | 'email' | 'number' | 'password' | 'textarea';

type Props = {
  label?: string;
  placeholder?: string;
  type?: InputType;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onEnterPress?: () => void;
  name?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
};

export const Input: React.FC<Props> = ({
  placeholder,
  type = 'text',
  value,
  onChange,
  onEnterPress,
  name,
  required = false,
  disabled = false
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && onEnterPress) {
      onEnterPress();
    }
  };

  return (
    <>
      {type === 'textarea' ? (
        <textarea
          name={name}
          className={styles.input}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          required={required}
          disabled={disabled}
        />
      ) : (
        <input
          type={type}
          name={name}
          className={styles.input}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          required={required}
          disabled={disabled}
        />
      )}
    </>
  );
};
