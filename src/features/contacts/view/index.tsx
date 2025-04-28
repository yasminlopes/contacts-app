import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Plus, RefreshCcwDotIcon } from 'lucide-react';
import Button from '../../../shared/components/button';
import Modal from '../../../shared/components/modal';
import ContactForm from '../contact-form';
import FormProvider from '../../../shared/components/hookform/form-provider';
import { useGetAllContacts } from '../../../shared/hooks/use-contact';
import ContactsList from '../contact-list';
import { REGEX } from '../../../shared/utils/regex';
import { isValidCpf } from '../../../shared/validators/cpf-validator';
import { createContact, deleteContact, deletePhoto, updateContact, updatePhoto } from '../../../shared/services/contact-api';
import { useToast } from '../../../shared/hooks/use-toast';
import { SearchInput } from '../../../shared/components/search-input';
import { Pagination } from '../../../shared/components/pagination';
import { Contact } from '../../../shared/types/contact';
import { formatCpf, formatPhone } from '../../../shared/utils/formatters';

const schema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  cpf: yup.string().required('Campo obrigatório').test('cpf-valido','CPF inválido',(value) => !!value && isValidCpf(value)),
  email: yup.string().required('Campo obrigatório').email('Email inválido'),
  phone: yup.string().required('Campo obrigatório').matches(REGEX.phone, 'Telefone inválido'),
  photo: yup.string().nullable().notRequired(),
});

export default function Contacts() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const { data: contacts, mutate, loading, meta } = useGetAllContacts({
    page,
    term: searchTerm,
  });

  const handleClose = () => {
    setIsOpen(false);
    setSelectedContact(null);
  };
  
  const handleOpen = () => setIsOpen(true);

  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact)
    handleOpen()
  };

  const methods = useForm({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver<any, any, any>(schema),
    defaultValues: selectedContact || {
      name: '',
      cpf: '',
      email: '',
      phone: '',
      photo: '',
    }
  })

  const {
    handleSubmit,
    // formState: { isSubmitting },
    reset,
  } = methods;

  const { addToast } = useToast();

  const onSubmit = handleSubmit(async (formData) => {
    try {
      let response;

      const payload = {
        name: formData.name,
        cpf: formData.cpf.replace(REGEX.onlyDigits, ''),
        email: formData.email,
        phone: formData.phone.replace(REGEX.onlyDigits, ''),
      }
      
      if (selectedContact) {
        response = await updateContact(selectedContact.guid, payload);
      } else {
        response = await createContact(payload);
      }
  
      addToast(response?.message, 'success');
      handleClose();
      reset();
      mutate();
    } catch (error: unknown) {
      addToast(error instanceof Error ? error.message : String(error), 'error');
    }
  });
  
  const handleDeleteContact = async (contactId: string) => {
    try {
      await deleteContact(contactId);
      addToast('Contato excluído com sucesso', 'success');
      mutate()
    } catch (error) {
      addToast(error instanceof Error ? error.message : String(error), 'error');
    }
  };

  const handleUpload = async (base64: string) => {
    if (selectedContact?.guid) {
      try {
        await updatePhoto(selectedContact?.guid, base64);
        mutate();
        addToast('Foto atualizada com sucesso!', 'success');
      } catch (error: unknown) {
        addToast(error instanceof Error ? error.message : String(error), 'error');
      }
    }
  }

  const handleRemove = async () => {
    if (selectedContact?.guid) {
      try {
        await deletePhoto(selectedContact?.guid);
        mutate();
        addToast('Foto removida com sucesso!', 'success');
      } catch (error: unknown) {
        addToast(error instanceof Error ? error.message : String(error), 'error');
      }
    }
  }
  
  const renderContent = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <ContactForm
        onUpload={handleUpload}
        onRemove={handleRemove}
      />
    </FormProvider>
  );
  

  useEffect(() => {
    if (selectedContact) {
      reset({
        ...selectedContact,
        cpf: formatCpf(selectedContact.cpf),
        phone: formatPhone(selectedContact.phone),
      });
    } else {
      reset({
        name: '',
        cpf: '',
        email: '',
        phone: '',
        photo: '',
      });
    }
  }, [selectedContact, reset]);

  return (
    <>
      <div className="flex items-start gap-6">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Lista de contatos</h1>
            <SearchInput value={searchTerm} onChange={setSearchTerm} />
            <div className="flex items-center gap-2">
              <Button
                startIcon={<RefreshCcwDotIcon size={18} />}
                onClick={() => mutate()}
                variant="soft"
                tooltip='Recarregar contatos'
                tooltipPosition="bottom"
                loading={loading}
              />
              <Button startIcon={<Plus size={18} />} onClick={handleOpen}>
                Adicionar contato
              </Button>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <ContactsList
                data={contacts || []}
                loading={loading}
                onViewContact={handleViewContact} 
                onDeleteContact={handleDeleteContact}
              />
            </div>
            <Pagination
              currentPage={(meta?.page ?? 1)}
              totalPages={meta?.pages || 1}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>

      <Modal
        open={isOpen}
        onClose={handleClose}
        onConfirm={onSubmit}
        loading={methods.formState.isSubmitting}
        title={selectedContact ? 'Editar contato' : 'Adicionar contato'}
        size="lg"
        body={renderContent}
      />
    </>
  );
}
