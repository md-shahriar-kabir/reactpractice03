import { createContext, useContext, useReducer, useMemo } from 'react';
import { expenseReducer, initialExpenseState } from './expenseReducer';
import { ACTION_TYPES } from './expenseActions';
import { CATEGORIES } from '../utils/constants';

const ExpenseContext = createContext(null);

export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(expenseReducer, initialExpenseState);

  const totalExpense = useMemo(() => {
    return state.expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  }, [state.expenses]);

  const totalEntries = state.expenses.length;

  const budgetRemaining = useMemo(() => {
    return state.monthlyBudget - totalExpense;
  }, [state.monthlyBudget, totalExpense]);

  const budgetSpentPercentage = useMemo(() => {
    if (!state.monthlyBudget || state.monthlyBudget === 0) return 0;
    return (totalExpense / state.monthlyBudget) * 100;
  }, [state.monthlyBudget, totalExpense]);

  const isOverBudget = totalExpense > state.monthlyBudget;

  const categoryTotals = useMemo(() => {
    const totals = {};
    CATEGORIES.forEach((cat) => {
      totals[cat] = 0;
    });

    state.expenses.forEach((item) => {
      if (totals[item.category] !== undefined) {
        totals[item.category] += Number(item.amount || 0);
      } else {
        totals[item.category] = Number(item.amount || 0);
      }
    });

    return totals;
  }, [state.expenses]);

  const filteredExpenses = useMemo(() => {
    let result = [...state.expenses];

    const query = state.searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter((item) =>
        item.title.toLowerCase().includes(query)
      );
    }

    if (state.selectedCategory && state.selectedCategory !== 'All') {
      result = result.filter((item) => item.category === state.selectedCategory);
    }

    result.sort((a, b) => {
      if (state.sortBy === 'date-desc') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (state.sortBy === 'date-asc') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      if (state.sortBy === 'amount-desc') {
        return Number(b.amount) - Number(a.amount);
      }
      if (state.sortBy === 'amount-asc') {
        return Number(a.amount) - Number(b.amount);
      }
      return 0;
    });

    return result;
  }, [state.expenses, state.searchQuery, state.selectedCategory, state.sortBy]);

  const isSearchOrFilterActive = Boolean(
    state.searchQuery.trim() || state.selectedCategory !== 'All'
  );

  const addExpense = (expenseData) => {
    dispatch({ type: ACTION_TYPES.ADD_EXPENSE, payload: expenseData });
  };

  const updateExpense = (expenseData) => {
    dispatch({ type: ACTION_TYPES.UPDATE_EXPENSE, payload: expenseData });
  };

  const deleteExpense = (id) => {
    dispatch({ type: ACTION_TYPES.DELETE_EXPENSE, payload: id });
  };

  const setSearchQuery = (query) => {
    dispatch({ type: ACTION_TYPES.SET_SEARCH_QUERY, payload: query });
  };

  const setCategoryFilter = (category) => {
    dispatch({ type: ACTION_TYPES.SET_CATEGORY_FILTER, payload: category });
  };

  const setSortBy = (sortKey) => {
    dispatch({ type: ACTION_TYPES.SET_SORT_BY, payload: sortKey });
  };

  const resetFilters = () => {
    dispatch({ type: ACTION_TYPES.RESET_FILTERS });
  };

  const openAddModal = () => {
    dispatch({ type: ACTION_TYPES.OPEN_ADD_MODAL });
  };

  const openEditModal = (expense) => {
    dispatch({ type: ACTION_TYPES.OPEN_EDIT_MODAL, payload: expense });
  };

  const closeModal = () => {
    dispatch({ type: ACTION_TYPES.CLOSE_MODAL });
  };

  const openDeleteConfirm = (expense) => {
    dispatch({ type: ACTION_TYPES.OPEN_DELETE_CONFIRM, payload: expense });
  };

  const closeDeleteConfirm = () => {
    dispatch({ type: ACTION_TYPES.CLOSE_DELETE_CONFIRM });
  };

  const showToast = (message, type = 'success') => {
    dispatch({ type: ACTION_TYPES.SHOW_TOAST, payload: { message, type } });
  };

  const hideToast = () => {
    dispatch({ type: ACTION_TYPES.HIDE_TOAST });
  };

  const contextValue = {
    ...state,
    totalExpense,
    totalEntries,
    budgetRemaining,
    budgetSpentPercentage,
    isOverBudget,
    categoryTotals,
    filteredExpenses,
    isSearchOrFilterActive,
    addExpense,
    updateExpense,
    deleteExpense,
    setSearchQuery,
    setCategoryFilter,
    setSortBy,
    resetFilters,
    openAddModal,
    openEditModal,
    closeModal,
    openDeleteConfirm,
    closeDeleteConfirm,
    showToast,
    hideToast,
    dispatch,
  };

  return (
    <ExpenseContext.Provider value={contextValue}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpense() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
}
