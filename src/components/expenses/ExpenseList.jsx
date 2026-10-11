import { useExpense } from '../../context/ExpenseContext';
import ExpenseItem from './ExpenseItem';
import EmptyState from './EmptyState';
import NotFoundState from './NotFoundState';

export default function ExpenseList() {
  const { expenses, filteredExpenses } = useExpense();

  const renderContent = () => {
    if (expenses.length === 0) {
      return <EmptyState />;
    }

    if (filteredExpenses.length === 0) {
      return <NotFoundState />;
    }

    return (
      <div id="expenseListContainer" className="space-y-3">
        {filteredExpenses.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))}
      </div>
    );
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-[#111827]">Transactions &amp; Records</h2>
          <span
            id="activeCountBadge"
            className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#80A1C1]/20 text-[#111827]"
          >
            {filteredExpenses.length} {filteredExpenses.length === 1 ? 'Record' : 'Records'}
          </span>
        </div>
        <div className="text-xs text-[#6B7280]">
          Click pencil to edit, trash to delete
        </div>
      </div>

      {renderContent()}
    </section>
  );
}
