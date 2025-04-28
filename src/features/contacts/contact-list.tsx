import { useState } from 'react';
import { Eye, Trash2 } from 'lucide-react';
import { Contact } from '../../shared/types/contact';
import ListTable from '../../shared/components/list-table';
import DeleteConfirmationModal from '../../shared/components/confirm-delete-modal';

interface Props {
  data: Contact[];
  loading: boolean;
  onViewContact: (contact: Contact) => void;
  onDeleteContact: (contactId: string) => void;
}

export default function ContactsList({
  data,
  loading,
  onViewContact,
  onDeleteContact,
}: Props) {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null)

  const handleDeleteContact = (contact: Contact) => {
    setContactToDelete(contact)
    setDeleteModalOpen(true)
  };

  const handleConfirmDelete = async () => {
    if (contactToDelete) {
      await onDeleteContact(contactToDelete?.guid)
      setDeleteModalOpen(false)
      setContactToDelete(null)
    }
  };

  return (
    <>
      <ListTable
        data={data}
        loading={loading}
        emptyMessage="Nenhum contato cadastrado"
        columns={[
          {
            render: (item) => (
              <img
                src={item.photo}
                alt={item.name}
                className="size-24 rounded-box"
              />
            ),
          },
          {
            render: (item) => (
              <div>
                <div>{item.name}</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {item.email}
                </div>
              </div>
            ),
          },
        ]}
        actions={(item) => (
          <>
            <button
              className="btn btn-square btn-ghost"
              title="Ver"
              onClick={() => onViewContact(item)}
            >
              <Eye size={18} />
            </button>
            <button
              className="btn btn-square btn-ghost"
              title="Remover"
              onClick={() => handleDeleteContact(item)} 
            >
              <Trash2 size={18} />
            </button>
          </>
        )}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)} 
        onConfirm={handleConfirmDelete} 
        contactName={contactToDelete?.name || ''} 
      />
    </>
  );
}
