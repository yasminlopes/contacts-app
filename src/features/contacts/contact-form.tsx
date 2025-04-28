import RHFTextField from '../../shared/components/hookform/rhf-textfield';
import RHFUploadAvatar from '../../shared/components/hookform/rhf-upload-avatar';

interface Props {
  contactId?: string;
  onUpload?: (base64: string) => void;
  onRemove?: () => void;
}

export default function ContactForm({ onUpload, onRemove }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-16 items-start w-full">
      <div className="flex flex-col items-center md:items-start gap-2">
      <RHFUploadAvatar
          name="photo"
          allowRemove
          onUpload={onUpload}
          onRemove={onRemove}
        />


        <p className="text-sm text-gray-500 leading-tight text-center md:text-left">
          Permitido: *.jpg, *.png
          <br />
          Tamanho máximo de 3 MB
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <RHFTextField
          name="name"
          label="Nome Completo"
          placeholder="Seu nome completo"
          maxLength={50}
        />
        <RHFTextField
          name="cpf"
          label="CPF"
          placeholder="000.000.000-00"
          mask="cpf"
        />
        <RHFTextField
          name="email"
          label="E-mail"
          placeholder="seu@email.com"
          type="email"
        />
        <RHFTextField
          name="phone"
          label="Celular"
          placeholder="(00) 00000-0000"
          mask="phone"
        />
      </div>
    </div>
  );
}
