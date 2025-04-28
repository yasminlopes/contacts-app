import Modal from './modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  contactName: string;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  contactName,
}: Props) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Excluir Contato"
      size="sm"
      body={
        <div className="p-4 text-center">
          <p className="mb-4 text-lg">
            Tem certeza de que deseja excluir o contato{' '}
            <strong>{contactName}</strong>? Esta ação não poderá ser desfeita.
          </p>
          <p className="text-sm text-gray-600">
            Ao confirmar, todas as informações relacionadas a esse contato serão permanentemente removidas.
          </p>
        </div>
      }
    />
  );
}
