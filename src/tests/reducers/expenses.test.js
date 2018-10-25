import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expenses if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '45445454545'
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should add new expense', () => {
  const action = {
    type: 'ADD_EXPENSE',
    expense: {
      id: '333',
      description: 'Vzgo',
      note: 'hello',
      amount: 333,
      createdAt:  moment()
    }
  }

  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, action.expense])
});

test('should edit an expense', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[1].id,
    updates: {
      amount: 3,
    }
  }
  const state = expensesReducer(expenses, action);
  expect(state[1]).toEqual({...expenses[1], ...action.updates})
});

test('should not edit an expense if id not found', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: -1,
    updates: {
      amount: 4,
    }
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses)
});