import { useExpense } from '../../context/ExpenseContext';

export default function TotalEntriesCard() {
  const { totalEntries, filteredExpenses, isSearchOrFilterActive } = useExpense();

  return (
    <div className="bg-white rounded-3xl p-6 border border-[#111827]/10 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Total Entries</span>
          <span className="p-2 rounded-xl bg-[#80A1C1]/15 text-[#80A1C1]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </span>
        </div>
        <div className="text-3xl font-extrabold font-mono text-[#111827] tracking-tight" id="totalEntriesDisplay">
          {totalEntries} {totalEntries === 1 ? 'Item' : 'Items'}
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-[#111827]/5 flex items-center justify-between text-xs text-[#6B7280]">
        <span>Active in list</span>
        <span className="font-medium text-[#111827]" id="filteredCountNotice">
          {isSearchOrFilterActive
            ? `Showing ${filteredExpenses.length} of ${totalEntries}`
            : 'Showing all items'}
        </span>
      </div>
    </div>
  );
}
