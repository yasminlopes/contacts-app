import { useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Camera, Trash2 } from 'lucide-react';
import { convertFileToBase64 } from '../../utils/base64';

interface Props {
  name: string;
  allowRemove?: boolean;
  onUpload?: (base64: string) => void; 
  onRemove?: () => void;
}

export default function RHFUploadAvatar({ name, allowRemove = false, onUpload, onRemove }: Props) {
  const { control } = useFormContext();
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => {
        const preview = typeof value === 'string' ? value : null;

        const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (!file) return;

          try {
            const base64 = await convertFileToBase64(file);
            onChange(base64);
            if (onUpload) {
              onUpload(base64);
            }
          } catch (err) {
            console.error('Erro ao converter imagem para base64:', err);
          }
        };

        const handleRemove = () => {
          onChange(null);
          if (onRemove) {
            onRemove()
          }
        };

        return (
          <div className="flex flex-col items-center gap-3 mb-6">
            <div
              className="relative w-48 h-48 rounded-full border border-dashed border-gray-300 cursor-pointer overflow-hidden group"
              onClick={() => fileRef.current?.click()}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <Camera size={32} />
                </div>
              )}

              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={24} className="text-white" />
              </div>

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {allowRemove && preview && (
              <button
                type="button"
                className="btn btn-error btn-sm mt-2"
                onClick={handleRemove}
              >
                <Trash2 size={16} className="mr-2" />
                Remover Foto
              </button>
            )}
          </div>
        );
      }}
    />
  );
}
