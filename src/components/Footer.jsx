export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#111827]/10 bg-[#FFF5E6]/40 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
        <p>© {new Date().getFullYear()} BentoSpend • Smart Expense Tracker</p>
        <p>Learn with Sumit - Assignment 03</p>
      </div>
    </footer>
  );
}
