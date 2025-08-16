import React, { useEffect, useRef } from 'react';
import styles from './MDialog.module.css';
import clsx from 'clsx';

type MDialogSize = 'small' | 'medium' | 'large';
type MDialogVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

type MDialogProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  size?: MDialogSize;
  variant?: MDialogVariant;
  className?: string;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  actions?: React.ReactNode;
};

export const MDialog: React.FC<MDialogProps> = ({
  children,
  isOpen,
  onClose,
  title,
  size = 'medium',
  variant = 'default',
  className = '',
  closeOnBackdropClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  actions,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Gerencia a abertura/fechamento do dialog
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  // Gerencia o fechamento com ESC
  useEffect(() => {
    if (!closeOnEscape || !onClose) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  // Handle click no backdrop
  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (!closeOnBackdropClick || !onClose) return;
    
    const dialog = dialogRef.current;
    if (dialog && event.target === dialog) {
      onClose();
    }
  };

  // Handle botão de fechar
  const handleCloseClick = () => {
    if (onClose) {
      onClose();
    }
  };

  // Previne o fechamento automático do dialog
  const handleCancel = (event: React.SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    if (onClose) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className={clsx(
        styles.mdialog,
        styles[size],
        styles[variant],
        {
          [styles.withActions]: !!actions,
          [styles.withTitle]: !!title,
        },
        className
      )}
      onClick={handleBackdropClick}
      onCancel={handleCancel}
    >
      <div className={styles.dialogContent}>
        {/* Header com título e botão fechar */}
        {(title || showCloseButton) && (
          <div className={styles.dialogHeader}>
            {title && (
              <h2 className={styles.dialogTitle}>{title}</h2>
            )}
            {showCloseButton && (
              <button
                className={styles.closeButton}
                onClick={handleCloseClick}
                aria-label="Fechar dialog"
                type="button"
              >
                ×
              </button>
            )}
          </div>
        )}

        {/* Body do dialog */}
        <div className={styles.dialogBody}>
          {children}
        </div>

        {/* Actions (botões) */}
        {actions && (
          <div className={styles.dialogActions}>
            {actions}
          </div>
        )}
      </div>
    </dialog>
  );
};

// Hook personalizado para controlar o dialog
export const useDialog = (initialState: boolean = false) => {
  const [isOpen, setIsOpen] = React.useState(initialState);

  const openDialog = React.useCallback(() => setIsOpen(true), []);
  const closeDialog = React.useCallback(() => setIsOpen(false), []);
  const toggleDialog = React.useCallback(() => setIsOpen(prev => !prev), []);

  return {
    isOpen,
    openDialog,
    closeDialog,
    toggleDialog,
  };
};

// Componente de exemplo de uso
export const MDialogExample: React.FC = () => {
  const { isOpen, openDialog, closeDialog } = useDialog();

  return (
    <div>
      <button onClick={openDialog}>Abrir Dialog</button>
      
      <MDialog
        isOpen={isOpen}
        onClose={closeDialog}
        title="Confirmar Ação"
        size="medium"
        variant="default"
        actions={
          <>
            <button onClick={closeDialog}>Cancelar</button>
            <button className="primary" onClick={closeDialog}>
              Confirmar
            </button>
          </>
        }
      >
        <p>Tem certeza de que deseja continuar com esta ação?</p>
      </MDialog>
    </div>
  );
};