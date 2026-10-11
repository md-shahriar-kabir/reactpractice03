import { useMemo } from 'react';
import { useExpense } from '../../context/ExpenseContext';
import { formatCurrency } from '../../utils/formatters';

export default function BudgetCard() {
  const { monthlyBudget, budgetRemaining, budgetSpentPercentage, isOverBudget } = useExpense();

  const daysLeft = useMemo(() => {
    const now = new Date();
    const totalDaysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    return Math.max(0, totalDaysInMonth - now.getDate());
  }, []);

  const clampedPercentage = Math.min(Math.max(budgetSpentPercentage, 0), 100);

  return (
    <div className="bg-gradient-to-br from-[#FFF5E6] to-[#FAD4C0]/40 rounded-3xl p-6 border border-[#111827]/10 shadow-sm hover:shadow-md transition-shadow lg:col-span-2 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
            Monthly Budget Target
          </span>
          <h3 className="text-xl font-bold text-[#111827] mt-0.5">
            {formatCurrency(monthlyBudget)} Limit
          </h3>
        </div>
        <div className="text-right">
          <span className="text-xs text-[#6B7280]">Remaining</span>
          <p
            className={`text-lg font-bold font-mono tracking-tight transition-colors ${
              isOverBudget ? 'text-[#DC2626]' : 'text-[#16A34A]'
            }`}
            id="budgetRemainingDisplay"
          >
            {formatCurrency(budgetRemaining)}
          </p>
        </div>
      </div>

      <div className="my-4">
        <div className="flex items-center justify-between text-xs font-medium text-[#111827] mb-1.5">
          <span className={isOverBudget ? 'text-[#DC2626] font-semibold' : ''}>
            Spent: {budgetSpentPercentage.toFixed(1)}% {isOverBudget && '(Exceeded)'}
          </span>
          <span>Limit: {formatCurrency(monthlyBudget)}</span>
        </div>
        <div className="w-full bg-white/70 h-3 rounded-full overflow-hidden p-0.5 border border-[#111827]/10">
          <div
            id="budgetProgressBar"
            className={`h-full rounded-full transition-all duration-500 ${
              isOverBudget ? 'bg-[#DC2626]' : 'bg-[#111827]'
            }`}
            style={{ width: `${clampedPercentage}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-[#6B7280] pt-2 border-t border-[#111827]/10">
        <span className="flex items-center gap-1.5">
          {isOverBudget ? (
            <>
              <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-pulse" />
              <span className="text-[#DC2626] font-semibold">Over budget limit</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
              <span>Healthy spending pace</span>
            </>
          )}
        </span>
        <span className="font-medium">{daysLeft} Days Left</span>
      </div>
    </div>
  );
}
