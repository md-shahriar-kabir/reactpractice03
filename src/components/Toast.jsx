import { useEffect } from 'react';
import { useExpense } from '../context/ExpenseContext';

export default function Toast() {
  const { toast, hideToast } = useExpense();

  useEffect(() => {
    if (!toast.show) return;

    const timer = setTimeout(() => {
      hideToast();
    }, 3500);

    return () => clearTimeout(timer);
  }, [toast.show, hideToast]);

  if (!toast.show) return null;

  const iconMap = {
    success: <span className="text-[#16A34A] text-lg font-bold">✓</span>,
    error: <span className="text-[#DC2626] text-lg font-bold">✕</span>,
    info: <span className="text-[#80A1C1] text-lg font-bold">ℹ</span>,
  };

  return (
    <div
      id="toastNotification"
      onClick={hideToast}
      className="fixed bottom-6 right-6 z-50 transform transition-all duration-300 max-w-md animate-in slide-in-from-bottom-5 cursor-pointer"
      title="Click to dismiss"
    >
      <div className="bg-[#111827] text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-white/10 hover:border-white/20 transition-all">
        <span id="toastIcon">{iconMap[toast.type] || iconMap.success}</span>
        <p id="toastMessage" className="text-xs font-medium text-[#FFF5E6]">
          {toast.message}
        </p>
      </div>
    </div>
  );
}
