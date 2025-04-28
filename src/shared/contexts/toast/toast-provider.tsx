import { useState } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";
import { ToastContext } from "./toast-context";

interface Props {
  children: React.ReactNode;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

let toastId = 0;

export function ToastProvider({ children, position = "top-right" }: Props) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: ToastType = "info") => {
    const id = toastId++;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 4000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  };

  const getIcon = (type: ToastType) => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-green-500" size={20} />;
      case "error":
        return <AlertTriangle className="text-red-500" size={20} />;
      default:
        return <Info className="text-blue-500" size={20} />;
    }
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}

      {createPortal(
        <div
          className={`fixed z-[9999] flex flex-col gap-2 ${positionClasses[position]}`}
        >
          {toasts.map(({ id, message, type }) => (
            <div
              key={id}
              className="alert bg-white text-gray-800 border border-base-300 shadow-lg w-80 flex items-center gap-3 px-4 py-3 rounded-lg"
            >
              {getIcon(type)}
              <span className="flex-1">{message}</span>
              <button
                className="btn btn-sm btn-circle btn-ghost ml-auto"
                onClick={() => removeToast(id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>,
        document.getElementById("toast-root")!
      )}
    </ToastContext.Provider>
  );
}
