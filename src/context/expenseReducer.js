import { ACTION_TYPES } from './expenseActions';
import { INITIAL_EXPENSES, MONTHLY_BUDGET_LIMIT } from '../utils/constants';

export const initialExpenseState = {
  expenses: INITIAL_EXPENSES,
  monthlyBudget: MONTHLY_BUDGET_LIMIT,
  searchQuery: '',
  selectedCategory: 'All',
  sortBy: 'date-desc',
  isFormModalOpen: false,
  editingExpense: null,
  isDeleteModalOpen: false,
  deletingExpense: null,
  toast: {
    show: false,
    message: '',
    type: 'success',
  },
};

export function expenseReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.ADD_EXPENSE: {
      return {
        ...state,
        expenses: [action.payload, ...state.expenses],
        isFormModalOpen: false,
        editingExpense: null,
        toast: {
          show: true,
          message: 'Expense added successfully!',
          type: 'success',
        },
      };
    }

    case ACTION_TYPES.UPDATE_EXPENSE: {
      const updatedList = state.expenses.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );
      return {
        ...state,
        expenses: updatedList,
        isFormModalOpen: false,
        editingExpense: null,
        toast: {
          show: true,
          message: 'Expense updated successfully!',
          type: 'success',
        },
      };
    }

    case ACTION_TYPES.DELETE_EXPENSE: {
      const filteredList = state.expenses.filter((item) => item.id !== action.payload);
      return {
        ...state,
        expenses: filteredList,
        isDeleteModalOpen: false,
        deletingExpense: null,
        toast: {
          show: true,
          message: 'Expense deleted successfully!',
          type: 'success',
        },
      };
    }

    case ACTION_TYPES.SET_SEARCH_QUERY: {
      return {
        ...state,
        searchQuery: action.payload,
      };
    }

    case ACTION_TYPES.SET_CATEGORY_FILTER: {
      return {
        ...state,
        selectedCategory: action.payload,
      };
    }

    case ACTION_TYPES.SET_SORT_BY: {
      return {
        ...state,
        sortBy: action.payload,
      };
    }

    case ACTION_TYPES.RESET_FILTERS: {
      return {
        ...state,
        searchQuery: '',
        selectedCategory: 'All',
        sortBy: 'date-desc',
      };
    }

    case ACTION_TYPES.OPEN_ADD_MODAL: {
      return {
        ...state,
        isFormModalOpen: true,
        editingExpense: null,
      };
    }

    case ACTION_TYPES.OPEN_EDIT_MODAL: {
      return {
        ...state,
        isFormModalOpen: true,
        editingExpense: action.payload,
      };
    }

    case ACTION_TYPES.CLOSE_MODAL: {
      return {
        ...state,
        isFormModalOpen: false,
        editingExpense: null,
      };
    }

    case ACTION_TYPES.OPEN_DELETE_CONFIRM: {
      return {
        ...state,
        isDeleteModalOpen: true,
        deletingExpense: action.payload,
      };
    }

    case ACTION_TYPES.CLOSE_DELETE_CONFIRM: {
      return {
        ...state,
        isDeleteModalOpen: false,
        deletingExpense: null,
      };
    }

    case ACTION_TYPES.SHOW_TOAST: {
      return {
        ...state,
        toast: {
          show: true,
          message: action.payload.message,
          type: action.payload.type || 'success',
        },
      };
    }

    case ACTION_TYPES.HIDE_TOAST: {
      return {
        ...state,
        toast: {
          ...state.toast,
          show: false,
        },
      };
    }

    default:
      return state;
  }
}
