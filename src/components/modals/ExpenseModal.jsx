import { useState, useEffect } from 'react';
import { useExpense } from '../../context/ExpenseContext';
import { CATEGORIES } from '../../utils/constants';
import { getTodayDateString } from '../../utils/formatters';

export default function ExpenseModal() {
  const {
    isFormModalOpen,
    editingExpense,
    closeModal,
    addExpense,
    updateExpense,
  } = useExpense();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(getTodayDateString());
  const [note, setNote] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title || '');
      setAmount(editingExpense.amount !== undefined ? String(editingExpense.amount) : '');
      setCategory(editingExpense.category || '');
      setDate(editingExpense.date || getTodayDateString());
      setNote(editingExpense.note || '');
    } else {
      setTitle('');
      setAmount('');
      setCategory('');
      setDate(getTodayDateString());
      setNote('');
    }
    setErrorMessage('');
  }, [editingExpense, isFormModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFormModalOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFormModalOpen, closeModal]);

  if (!isFormModalOpen) return null;

  const isEditing = Boolean(editingExpense);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setErrorMessage('Please enter an expense title.');
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setErrorMessage('Please enter a valid amount greater than $0.');
      return;
    }

    if (!category) {
      setErrorMessage('Please select a valid expense category.');
      return;
    }

    if (!date) {
      setErrorMessage('Please select a transaction date.');
      return;
    }

    setErrorMessage('');

    if (isEditing) {
      updateExpense({
        id: editingExpense.id,
        title: trimmedTitle,
        amount: numericAmount,
        category,
        date,
        note: note.trim(),
      });
    } else {
      addExpense({
        id: 'exp-' + Date.now(),
        title: trimmedTitle,
        amount: numericAmount,
        category,
        date,
        note: note.trim(),
      });
    }
  };

  return (
    <div
      id="expenseModal"
      onClick={closeModal}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111827]/50 backdrop-blur-xs transition-opacity duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#111827]/15 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#111827]/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFF5E6] text-[#111827] flex items-center justify-center border border-[#111827]/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#111827]" id="modalTitle">
                {isEditing ? 'Edit Expense' : 'Add New Expense'}
              </h3>
              <p className="text-xs text-[#6B7280]" id="modalSubtitle">
                {isEditing ? 'Update details for this transaction' : 'Enter details to record this transaction'}
              </p>
            </div>
          </div>
          <button
            type="button"
            id="closeModalBtn"
            onClick={closeModal}
            aria-label="Close modal"
            className="w-8 h-8 rounded-xl bg-[#FFF5E6] hover:bg-[#FAD4C0] text-[#111827] flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {errorMessage && (
          <div
            id="formValidationError"
            className="mb-4 p-3 rounded-2xl bg-[#DC2626]/10 border border-[#DC2626]/20 text-[#DC2626] text-xs font-medium flex items-center gap-2 animate-in fade-in"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span id="formErrorMessage">{errorMessage}</span>
          </div>
        )}

        <form id="expenseForm" onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="expenseTitle" className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-1.5">
              Expense Title <span className="text-[#DC2626]">*</span>
            </label>
            <input
              type="text"
              id="expenseTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Grocery shopping, House rent, Electricity bill"
              className="w-full px-4 py-2.5 bg-[#FFF5E6]/40 border border-[#111827]/15 rounded-xl text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#80A1C1] focus:bg-white transition-all"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="expenseAmount" className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-1.5">
                Amount ($) <span className="text-[#DC2626]">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#6B7280] font-mono text-sm font-semibold">
                  $
                </span>
                <input
                  type="number"
                  id="expenseAmount"
                  step="0.01"
                  min="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-2.5 bg-[#FFF5E6]/40 border border-[#111827]/15 rounded-xl text-sm font-mono text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#80A1C1] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="expenseCategory" className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-1.5">
                Category <span className="text-[#DC2626]">*</span>
              </label>
              <div className="relative">
                <select
                  id="expenseCategory"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full appearance-none px-4 py-2.5 bg-[#FFF5E6]/40 border border-[#111827]/15 rounded-xl text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#80A1C1] focus:bg-white transition-all cursor-pointer"
                >
                  <option value="" disabled>Select category</option>
                  <option value="Food">🍱 Food</option>
                  <option value="Rent">🏠 Rent</option>
                  <option value="Entertainment">🎬 Entertainment</option>
                  <option value="Medical">💊 Medical</option>
                  <option value="Utilities">⚡ Utilities</option>
                  <option value="Shopping">🛍️ Shopping</option>
                  <option value="Education">📚 Education</option>
                  <option value="Other">✨ Other</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#111827]">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="expenseDate" className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-1.5">
              Date <span className="text-[#DC2626]">*</span>
            </label>
            <input
              type="date"
              id="expenseDate"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#FFF5E6]/40 border border-[#111827]/15 rounded-xl text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#80A1C1] focus:bg-white transition-all"
            />
          </div>

          <div>
            <label htmlFor="expenseNote" className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-1.5">
              Note / Description <span className="text-xs font-normal text-[#6B7280] lowercase">(optional)</span>
            </label>
            <textarea
              id="expenseNote"
              rows="2"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add brief details about this expense..."
              className="w-full px-4 py-2 bg-[#FFF5E6]/40 border border-[#111827]/15 rounded-xl text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#80A1C1] focus:bg-white transition-all resize-none"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#111827]/10">
            <button
              type="button"
              id="cancelModalBtn"
              onClick={closeModal}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-[#111827] bg-[#FFF5E6] hover:bg-[#FAD4C0]/40 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="submitExpenseBtn"
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-[#111827] bg-[#FAD4C0] hover:bg-[#f5c0a7] active:scale-[0.98] transition-all shadow-sm border border-[#111827]/10 cursor-pointer"
            >
              {isEditing ? 'Update Expense' : 'Save Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
