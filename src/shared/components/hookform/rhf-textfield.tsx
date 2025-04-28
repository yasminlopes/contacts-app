/* eslint-disable */
import { useCallback } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { cpf, phone } from '../../utils/masks';

type MaskType = 'cpf' | 'phone';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  mask?: MaskType;
  onlyDigits?: boolean;
  maxLength?: number;
  minLength?: number;
  rows?: number;
  inputSize?: 'sm' | 'md' | 'lg';
}

export default function RHFTextField({
  name,
  label,
  mask,
  onlyDigits,
  maxLength,
  minLength,
  rows = 3,
  type = 'text',
  inputSize = 'md',
  ...rest
}: Props) {
  const { control } = useFormContext();

  // prettier-ignore
  const maskMap: Record<MaskType, (event: React.ChangeEvent<HTMLInputElement>) => string> = {
    cpf,
    phone,
  }

  const handleChange = useCallback((field: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (mask && maskMap[mask]) {
        const masked = maskMap[mask](e);
        e.target.value = masked;
        return field.onChange(masked);
      }

      if (type === 'number') {
        return field.onChange(Number(e.target.value));
      }

      return field.onChange(e.target.value);
    },
    [mask, type]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        onlyDigits &&
        !/^[0-9]$/.test(e.key) &&
        !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(
          e.key
        )
      ) {
        e.preventDefault();
      }
    },
    [onlyDigits]
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="form-control w-full mb-4">
          <label className="label text-gray-60 text-sm font-medium">
            {label}
          </label>

            <input
              {...field}
              type={type}
              onChange={handleChange(field)}
              onKeyDown={handleKeyDown}
              className={`input input-bordered w-full input-${inputSize} ${
                error ? 'input-error' : ''
              }`}
              maxLength={maxLength}
              minLength={minLength}
              inputMode={onlyDigits ? 'numeric' : undefined}
              pattern={onlyDigits ? '\\d*' : undefined}
              autoComplete={onlyDigits ? 'off' : undefined}
              autoCorrect={onlyDigits ? 'off' : undefined}
              autoCapitalize={onlyDigits ? 'off' : undefined}
              spellCheck={onlyDigits ? 'false' : undefined}
              {...rest}
            />

          {error && (
            <span className="text-error text-sm mt-1">{error.message}</span>
          )}
        </div>
      )}
    />
  );
}
