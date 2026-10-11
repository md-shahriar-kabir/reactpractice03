import { useEffect } from 'react';
import { useExpense } from '../../context/ExpenseContext';

export default function DeleteConfirmModal() {
  const {
    isDeleteModalOpen,
    deletingExpense,
    closeDeleteConfirm,
    deleteExpense,
  } = useExpense();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isDeleteModalOpen) {
        closeDeleteConfirm();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDeleteModalOpen, closeDeleteConfirm]);

  if (!isDeleteModalOpen || !deletingExpense) return null;

  return (
    <div
      id="deleteConfirmModal"
      onClick={closeDeleteConfirm}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111827]/50 backdrop-blur-xs transition-opacity duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-sm w-full p-6 border border-[#111827]/15 shadow-2xl text-center animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="w-14 h-14 mx-auto rounded-2xl bg-[#DC2626]/10 text-[#DC2626] flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-[#111827]">Delete Expense?</h3>
        <p className="text-xs text-[#6B7280] mt-1.5 mb-6">
          Are you sure you want to remove{' '}
          <span className="font-semibold text-[#111827]" id="deleteTargetTitle">
            "{deletingExpense.title}"
          </span>
          ? This action cannot be undone.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            id="cancelDeleteBtn"
            onClick={closeDeleteConfirm}
            className="w-full py-2.5 rounded-xl text-xs font-semibold text-[#111827] bg-[#FFF5E6] hover:bg-[#FAD4C0]/40 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            id="confirmDeleteBtn"
            onClick={() => deleteExpense(deletingExpense.id)}
            className="w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-[#DC2626] hover:bg-[#b91c1c] active:scale-[0.98] transition-all shadow-sm cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
