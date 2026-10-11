# BentoSpend - Smart Expense Tracker

A modular expense tracking and personal budget management application built with **React**, **Tailwind CSS**, and **Vite**. This project was developed as part of **Learn with Sumit (LWS) - Assignment 03**.

It features a Bento-grid dashboard, live budget tracking with over-budget alerts, category spending breakdowns, search, filtering, sorting, and state management using React's native **Context API** and **`useReducer`**.

---

## Features

- **Global State Management**: Built using `useReducer` and `createContext` without any external state management libraries.
- **Analytics Dashboard**:
  - **Total Expenses**: Real-time sum of all recorded transactions.
  - **Total Entries**: Current count of transactions with active filter status.
  - **Monthly Budget Target**: Tracks remaining balance, spending percentage, and alerts when over budget with a countdown of remaining days in the month.
- **Category Spending Overview**: Breakdown of spending across categories (Food, Rent, Entertainment, Medical, Utilities, Shopping, Education, Other). Clicking a category filters the transactions list.
- **Add & Edit Transactions**: Modal form with validation for title, amount, category, date, and optional notes.
- **Delete Confirmation**: Confirmation modal before deleting any transaction.
- **Search, Filter & Sort**:
  - Real-time title search with clear button.
  - Category filter pills.
  - Sort by Date (newest / oldest) and Amount (high to low / low to high).
  - One-click filter reset.
- **Empty & Not Found States**: Dedicated views when no transactions exist or when no search/filter results match.
- **Toast Notifications**: Feedback alerts when transactions are added, edited, or deleted.

---

## Tech Stack

- **React 19**
- **Vite**
- **Tailwind CSS v4**
- **JavaScript (ES6+)**

---

## Project Structure

```
src/
├── components/
│   ├── analytics/
│   │   ├── BentoGrid.jsx
│   │   ├── BudgetCard.jsx
│   │   ├── CategoryOverview.jsx
│   │   ├── TotalEntriesCard.jsx
│   │   └── TotalExpenseCard.jsx
│   ├── expenses/
│   │   ├── EmptyState.jsx
│   │   ├── ExpenseItem.jsx
│   │   ├── ExpenseList.jsx
│   │   └── NotFoundState.jsx
│   ├── modals/
│   │   ├── DeleteConfirmModal.jsx
│   │   └── ExpenseModal.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── Toast.jsx
│   └── Toolbar.jsx
├── context/
│   ├── ExpenseContext.jsx
│   ├── expenseActions.js
│   └── expenseReducer.js
├── utils/
│   ├── constants.js
│   └── formatters.js
├── App.jsx
├── index.css
└── main.jsx
```

---

## Getting Started

### 1. Clone & Install Dependencies

```bash
git clone <repo-url>
cd rnext-5-assignments
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

Open `http://localhost:5173/` in your browser.

### 3. Build for Production

```bash
npm run build
```

---

## State Management

State is centralized in `src/context/`:
- `expenseActions.js`: Defines action type constants (`ADD_EXPENSE`, `UPDATE_EXPENSE`, `DELETE_EXPENSE`, filter and modal controls).
- `expenseReducer.js`: Pure reducer handling state transitions.
- `ExpenseContext.jsx`: Provides state, derived calculations (totals, remaining budget, filtered list), and action helpers via a custom `useExpense()` hook.
