import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
  <div>
    <h1>Expense List</h1>
    {
      !props.expenses.length ? (
        <p>No expenses</p>
      ) : (
        props.expenses.map((expense) => {
          return <ExpenseListItem key={expense.id} {...expense} />;
        })
      )
    }
  </div>
);

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

export default connect(mapStateToProps)(ExpenseList);


// state is our redux store
// We also can pass another props to ExpenseList right where we call it



// import { connect } from 'react-redux'

// const TodoItem = ({ todo, destroyTodo }) => {
//   return (
//     <div>
//       {todo.text}
//       <span onClick={destroyTodo}> x </span>
//     </div>
//   )
// }

// const mapStateToProps = state => {
//   return {
//     todo: state.todos[0]
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     destroyTodo: () =>
//       dispatch({
//         type: 'DESTROY_TODO'
//       })
//   }
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(TodoItem)

// mapStateToProps and mapDispatchToProps are both pure functions that are provided the stores “state” and “dispatch” respectively.
// Furthermore, both functions have to return an object, whose keys will then be passed on as the props of the component they are connected to.

// In this case, mapStateToProps returns an object with only one key : “todo”, and mapDispatchToProps returns an object with the destroyTodo key.
