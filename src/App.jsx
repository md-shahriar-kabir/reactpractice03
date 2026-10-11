import Header from './components/Header';
import BentoGrid from './components/analytics/BentoGrid';
import CategoryOverview from './components/analytics/CategoryOverview';
import Toolbar from './components/Toolbar';
import ExpenseList from './components/expenses/ExpenseList';
import ExpenseModal from './components/modals/ExpenseModal';
import DeleteConfirmModal from './components/modals/DeleteConfirmModal';
import Toast from './components/Toast';
import Footer from './components/Footer';
import { ExpenseProvider } from './context/ExpenseContext';

export default function App() {
  return (
    <ExpenseProvider>
      <div className="min-h-screen flex flex-col antialiased selection:bg-[#FAD4C0] selection:text-[#111827]">
        <Header />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <BentoGrid />
          <CategoryOverview />
          <Toolbar />
          <ExpenseList />
        </main>

        <Footer />

        <ExpenseModal />
        <DeleteConfirmModal />
        <Toast />
      </div>
    </ExpenseProvider>
  );
}
