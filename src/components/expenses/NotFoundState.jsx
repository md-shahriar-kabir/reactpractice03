import { useExpense } from '../../context/ExpenseContext';

export default function NotFoundState() {
  const { resetFilters, searchQuery, selectedCategory } = useExpense();

  return (
    <div id="notFoundState" className="bg-white rounded-3xl p-12 text-center border border-[#111827]/10">
      <img src="/assets/not-found.svg" alt="Not found" className="w-32 h-32 mx-auto mb-4" />
      <h3 className="text-lg font-bold text-[#111827]">Not Found</h3>
      <p className="text-sm text-[#6B7280] max-w-sm mx-auto mt-1 mb-6" id="notFoundReason">
        {searchQuery && selectedCategory !== 'All'
          ? `No expense transactions matched "${searchQuery}" in category "${selectedCategory}".`
          : searchQuery
          ? `No expense transactions matched "${searchQuery}".`
          : `No expense transactions found in category "${selectedCategory}".`}
      </p>
      <button
        type="button"
        id="clearSearchFilterBtn"
        onClick={resetFilters}
        className="inline-flex items-center gap-2 bg-[#FFF5E6] hover:bg-[#FAD4C0] active:scale-[0.98] text-[#111827] border border-[#111827]/15 px-4 py-2 rounded-xl font-semibold text-xs transition-all cursor-pointer"
      >
        <span>Clear Search &amp; Filters</span>
      </button>
    </div>
  );
}
