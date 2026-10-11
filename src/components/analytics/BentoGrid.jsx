import TotalExpenseCard from './TotalExpenseCard';
import TotalEntriesCard from './TotalEntriesCard';
import BudgetCard from './BudgetCard';

export default function BentoGrid() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <TotalExpenseCard />
      <TotalEntriesCard />
      <BudgetCard />
    </section>
  );
}
