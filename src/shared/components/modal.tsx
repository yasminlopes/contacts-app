import clsx from 'clsx';
import { CircleX } from 'lucide-react';
import { ReactNode, useEffect, useRef } from 'react';
import Button from './button';

type ModalSize = 'sm' | 'md' | 'lg';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title?: string;
  body: ReactNode;
  size?: ModalSize;
  disabled?: boolean;
}

export default function Modal({
  open,
  onClose,
  onConfirm,
  title,
  body,
  size = 'md',
  disabled,
}: Props) {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    if (open) modal.showModal();
    else modal.close();
  }, [open]);

  const sizeClass =
    size === 'sm' ? 'max-w-sm' : size === 'lg' ? 'max-w-3xl' : 'max-w-xl'; // md

  return (
    <dialog ref={modalRef} className="modal">
      <div className={clsx('modal-box', sizeClass)}>
        <form method="dialog">
          <Button
            onClick={onClose}
            variant="ghost"
            startIcon={<CircleX size={18} />}
            className="absolute right-2 top-2"
            aria-label="Fechar modal"
          />
        </form>

        {title && <h3 className="font-bold text-lg mb-4">{title}</h3>}
        <div>{body}</div>

        <div className="modal-action">
          <Button onClick={onClose} variant="ghost">
            Cancelar
          </Button>

          {onConfirm && (
            <Button onClick={onConfirm} type="submit" disabled={disabled}>
              Salvar
            </Button>
          )}
        </div>
      </div>
    </dialog>
  );
}
