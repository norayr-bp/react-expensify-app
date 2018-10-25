import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('should setup edit expense action object', () => {
  const action = editExpense('123', { note: 'new note' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123',
    updates: {
      note: 'new note'
    }
  });
});

test('should setup add expense action object with provided values', () => {
  const action = addExpense({
    description: 'hi', 
    note: 'new note',
    amount: 3,
    createdAt: 125000
  });

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      description: 'hi', 
      note: 'new note',
      amount: 3,
      createdAt: 125000,
      id: expect.any(String)
    }
  })
});

test('should setup add expense action object with default values', () => {
  const action = addExpense();
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      description: '',
      note: '',
      amount: 0,
      createdAt: 0,
      id: expect.any(String)
    }
  })
});