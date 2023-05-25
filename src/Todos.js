import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTodo, destroyTodo, updateUser } from './store';
import { Link, useParams } from 'react-router-dom';

const Todos = ()=> {
  const { categories, todos, users } = useSelector(state => state);
  const { term } = useParams();
  const dispatch = useDispatch();
  const filtered = todos.filter(todo => !term || todo.name.includes(term));

  return (
    <div>
      {
        filtered.length !== todos.length ? (
          <h2>You are filtering { filtered.length } out of { todos.length }</h2>
        ): null
      }
      <ul>
        {
          filtered.map( todo => {
            const category = categories.find(category => category.id === todo.categoryId);
            return (
              <li key={ todo.id }>
                <Link to={`/${todo.id}`}>
                  { todo.name }
                </Link>
                ({ category ? category.name : 'none'})
                <button
                  onClick= {
                    ()=> {
                      dispatch(destroyTodo(todo));
                    }
                  }
                >
                x
                </button>
                <select
                  value={ todo.categoryId }
                  onChange = {
                    ev => {
                      const updatedTodo = {...todo, categoryId: ev.target.value * 1};
                      dispatch(updateTodo(updatedTodo));
                    }
                  }
                >
                  {
                    categories.map( category => {
                      return (
                        <option value={ category.id } key={ category.id }>{ category.name }</option>
                      );
                    })
                  }
                </select>
                {/* <button onClick={
                  () => {
                    dispatch(updateTodo(user.id))
                  }
                }>Add User</button> */}
              </li>
            );
          })
        }
      </ul>
    </div>
  )
};

export default Todos;

