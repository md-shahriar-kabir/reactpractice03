import { useExpense } from '../context/ExpenseContext';
import { CATEGORIES, CATEGORY_CONFIG } from '../utils/constants';

export default function Toolbar() {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setCategoryFilter,
    sortBy,
    setSortBy,
    resetFilters,
  } = useExpense();

  return (
    <section className="bg-white rounded-3xl p-5 sm:p-6 border border-[#111827]/10 shadow-sm space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="block md:hidden w-full">
          <div className="relative">
            <input
              type="text"
              id="mobileSearchInput"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search expenses by title..."
              className="w-full pl-10 pr-10 py-2 bg-[#FFF5E6]/60 border border-[#111827]/15 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#80A1C1]"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6B7280]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear mobile search"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6B7280] hover:text-[#111827] cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none" id="categoryFilterContainer">
          <button
            type="button"
            data-category="All"
            onClick={() => setCategoryFilter('All')}
            className={`filter-pill px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shadow-sm ${
              selectedCategory === 'All'
                ? 'bg-[#111827] text-white active'
                : 'bg-[#FFF5E6] hover:bg-[#FAD4C0]/50 text-[#111827] border border-[#111827]/10'
            }`}
          >
            All Categories
          </button>
          {CATEGORIES.map((cat) => {
            const config = CATEGORY_CONFIG[cat] || { icon: '✨' };
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                data-category={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`filter-pill px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#111827] text-white shadow-sm active'
                    : 'bg-[#FFF5E6] hover:bg-[#FAD4C0]/50 text-[#111827] border border-[#111827]/10'
                }`}
              >
                {config.icon} {cat}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 self-end lg:self-auto">
          <div className="flex items-center gap-2 text-xs text-[#6B7280]">
            <span className="font-medium whitespace-nowrap">Sort by:</span>
            <div className="relative">
              <select
                id="sortBySelect"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-[#FFF5E6] border border-[#111827]/15 text-[#111827] text-xs font-semibold rounded-xl pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-[#80A1C1] cursor-pointer"
              >
                <option value="date-desc">Date: Newest First</option>
                <option value="date-asc">Date: Oldest First</option>
                <option value="amount-desc">Amount: High to Low</option>
                <option value="amount-asc">Amount: Low to High</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#111827]">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <button
            type="button"
            id="resetFiltersBtn"
            onClick={resetFilters}
            title="Reset filters and sorting"
            className="p-2 rounded-xl bg-[#FFF5E6] hover:bg-[#FAD4C0]/50 text-[#111827] border border-[#111827]/10 transition-all cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
