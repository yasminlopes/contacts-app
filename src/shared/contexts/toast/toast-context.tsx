import { createContext } from 'react';

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);
