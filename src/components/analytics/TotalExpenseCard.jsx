import { useExpense } from '../../context/ExpenseContext';
import { formatCurrency } from '../../utils/formatters';

export default function TotalExpenseCard() {
  const { totalExpense } = useExpense();

  return (
    <div className="bg-white rounded-3xl p-6 border border-[#111827]/10 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#FAD4C0]/40 rounded-full blur-2xl pointer-events-none"></div>
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Total Expense</span>
          <span className="p-2 rounded-xl bg-[#FFF5E6] text-[#D97706]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </span>
        </div>
        <div className="text-3xl font-extrabold font-mono text-[#111827] tracking-tight" id="totalExpenseDisplay">
          {formatCurrency(totalExpense)}
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-[#111827]/5 flex items-center justify-between text-xs text-[#6B7280]">
        <span className="flex items-center gap-1 text-[#16A34A] font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          Dynamic Live Calc
        </span>
        <span>All Recorded</span>
      </div>
    </div>
  );
}
