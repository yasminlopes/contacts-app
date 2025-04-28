import { useContext } from 'react';
import { ToastContext } from '../contexts/toast';

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast deve ser usado dentro do ToastProvider');

  return context;
}
