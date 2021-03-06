
import {connect} from 'react-redux'
import {UpdateTodoAction, DeleteTodoAction, LoadTodosAction }
from '../actions'
import {updateTodo, deleteTodo, loadTodos}
from '../services/TodoService'
import TodoList from './TodoList'

const showTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_TODOS':
            return todos
        case 'SHOW_ACTIVES':
            return todos.filter(todo => !todo.active)
        case 'SHOW_COMPLETES':
            return todos.filter(todo => todo.active)
        default:
            return todos
    }
}

const mapStateToProps = (state) => {
    return {
        todos: showTodos(state.todos, state.filter_visibility)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleUpdate: (id, active) => {
            console.log('actualizar todo a completado');
            console.log(id);
            console.log(active);
            updateTodo(id, active).then(todo => {
                dispatch(UpdateTodoAction(todo.id, todo.active))
            })
        },
        handleDelete: (id) => {
            console.log('eliminar un todo');
            console.log(id);
            deleteTodo(id).then(res => {
                dispatch(DeleteTodoAction(id))
            })
        },
        loadTodos: () => {
            console.log('update todos');
            loadTodos().then(todos => {
                dispatch(LoadTodosAction(todos))
            })
        }
    }
}


const TodoListContainer = connect(
 mapStateToProps,
 mapDispatchToProps
)(TodoList);

export default TodoListContainer
