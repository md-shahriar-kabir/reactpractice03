import { useExpense } from '../../context/ExpenseContext';
import { CATEGORIES, CATEGORY_CONFIG } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatters';

export default function CategoryOverview() {
  const { categoryTotals, selectedCategory, setCategoryFilter } = useExpense();

  return (
    <section className="bg-white rounded-3xl p-6 border border-[#111827]/10 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-base font-bold text-[#111827]">Category Spending Overview</h2>
          <p className="text-xs text-[#6B7280]">Real-time dynamic category distribution</p>
        </div>
        <div className="text-xs font-semibold text-[#80A1C1] bg-[#80A1C1]/10 px-3 py-1.5 rounded-full self-start sm:self-auto">
          Updated with State
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3" id="categoryOverviewGrid">
        {CATEGORIES.map((category) => {
          const config = CATEGORY_CONFIG[category] || { icon: '✨', label: category };
          const amount = categoryTotals[category] || 0;
          const isSelected = selectedCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setCategoryFilter(isSelected ? 'All' : category)}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#111827] text-white border-[#111827] shadow-sm'
                  : 'bg-[#FFF5E6] hover:bg-[#FAD4C0]/40 border-[#111827]/5 text-[#111827]'
              }`}
              title={`Filter by ${category}`}
            >
              <span className={`text-xs font-medium truncate ${isSelected ? 'text-[#FAD4C0]' : 'text-[#6B7280]'}`}>
                {config.icon} {category}
              </span>
              <span className="text-sm font-bold font-mono mt-1">
                {formatCurrency(amount)}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
