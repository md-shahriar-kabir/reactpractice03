export const CATEGORIES = [
  'Food',
  'Rent',
  'Entertainment',
  'Medical',
  'Utilities',
  'Shopping',
  'Education',
  'Other',
];

export const CATEGORY_CONFIG = {
  Food: {
    label: 'Food',
    icon: '🍱',
    badgeClass: 'bg-[#FAD4C0]/40 text-[#111827] border border-[#FAD4C0]',
    iconBoxClass: 'bg-[#FAD4C0]/40 border border-[#FAD4C0]',
  },
  Rent: {
    label: 'Rent',
    icon: '🏠',
    badgeClass: 'bg-[#80A1C1]/20 text-[#111827] border border-[#80A1C1]/40',
    iconBoxClass: 'bg-[#80A1C1]/20 border border-[#80A1C1]/40',
  },
  Entertainment: {
    label: 'Entertainment',
    icon: '🎬',
    badgeClass: 'bg-purple-100 text-purple-900 border border-purple-200',
    iconBoxClass: 'bg-purple-100 border border-purple-200',
  },
  Medical: {
    label: 'Medical',
    icon: '💊',
    badgeClass: 'bg-red-50 text-[#DC2626] border border-red-200',
    iconBoxClass: 'bg-red-50 border border-red-200',
  },
  Utilities: {
    label: 'Utilities',
    icon: '⚡',
    badgeClass: 'bg-amber-50 text-[#D97706] border border-amber-200',
    iconBoxClass: 'bg-amber-50 border border-amber-200',
  },
  Shopping: {
    label: 'Shopping',
    icon: '🛍️',
    badgeClass: 'bg-emerald-50 text-[#16A34A] border border-emerald-200',
    iconBoxClass: 'bg-emerald-50 border border-emerald-200',
  },
  Education: {
    label: 'Education',
    icon: '📚',
    badgeClass: 'bg-blue-50 text-blue-900 border border-blue-200',
    iconBoxClass: 'bg-blue-50 border border-blue-200',
  },
  Other: {
    label: 'Other',
    icon: '✨',
    badgeClass: 'bg-gray-100 text-[#111827] border border-gray-200',
    iconBoxClass: 'bg-gray-100 border border-gray-200',
  },
};

export const INITIAL_EXPENSES = [
  {
    id: 'exp-1',
    title: 'Office Ergonomic Chair & Desk Pad',
    amount: 480.00,
    category: 'Shopping',
    date: '2026-08-25',
    note: 'Workstation upgrade',
  },
  {
    id: 'exp-2',
    title: 'Weekend Cinema & Dinner',
    amount: 150.00,
    category: 'Entertainment',
    date: '2026-08-20',
    note: 'Movie tickets and restaurant bill',
  },
  {
    id: 'exp-3',
    title: 'Full Body Medical Health Checkup',
    amount: 375.00,
    category: 'Medical',
    date: '2026-08-15',
    note: 'Annual medical examination',
  },
  {
    id: 'exp-4',
    title: 'High-speed Internet & Electricity',
    amount: 220.00,
    category: 'Utilities',
    date: '2026-08-10',
    note: 'Utility bill payment',
  },
  {
    id: 'exp-5',
    title: 'Supermarket Grocery & Supplies',
    amount: 420.00,
    category: 'Food',
    date: '2026-08-05',
    note: 'Weekly essentials and vegetables',
  },
  {
    id: 'exp-6',
    title: 'Monthly House Rent',
    amount: 1200.00,
    category: 'Rent',
    date: '2026-08-01',
    note: 'Apartment monthly lease payment',
  },
];

export const MONTHLY_BUDGET_LIMIT = 4000.00;
