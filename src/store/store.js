import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        filter: 'all',
        timeout: 150,
        todos: [
            {
                id: 1,
                title: "Finist Vue Screencast",
                completed: false,
                editing: false
            },
            {
                id: 2,
                title: "Take over world",
                completed: false,
                editing: false
            }
        ]
    },
    getters: {
        remaining(state) {
            return state.todos.filter(todo => !todo.completed).length;
        },
        anyRemaining(state, getters) {
            return getters.remaining != 0 || state.todos.length == 0;
        },
        todosFiltered(state) {
            if (state.filter == "all") {
                return state.todos;
            } else if (state.filter == "active") {
                return state.todos.filter(todo => !todo.completed);
            } else if (state.filter == "completed") {
                return state.todos.filter(todo => todo.completed);
            }
        },
        showClearCompletedButton(state) {
            return state.todos.filter(todo => todo.completed).length > 0;
        }
    },
    mutations: {
        addTodo(state, todo) {
            state.todos.push({
                id: todo.id,
                title: todo.title,
                completed: false,
                editing: false
            })
        },
        clearCompleted(state) {
            state.todos = state.todos.filter(
                todo => !todo.completed
            )
        },
        removeTodo(state, id) {
            const index = state.todos.findIndex(todo => todo.id == id);
            state.todos.splice(index, 1);
        },
        finishedEdit(state, data) {
            const index = state.todos.findIndex(todo => todo.id == data.id);
            state.todos.splice(index, 1, {
                id: data.id,
                title: data.title,
                completed: data.completed,
                editing: data.editing
            });
        },
        updateFilter(store, filter) {
            store.filter = filter
        },
        checkAllTodos(state, checked) {
            state.todos.forEach(todo => todo.completed = checked)
        }
    },
    actions: {
        addTodo(context, todo) {
            setTimeout(() => {
                context.commit('addTodo', todo)
            }, context.state.timeout)
        },
        clearCompleted(context) {
            setTimeout(() => {
                context.commit('clearCompleted')
            }, context.state.timeout)
        },
        removeTodo(context, id) {
            setTimeout(() => {
                context.commit('removeTodo', id)
            }, context.state.timeout)
        },
        finishedEdit(context, data) {
            setTimeout(() => {
                context.commit('finishedEdit', data)
            }, context.state.timeout)
        },
        updateFilter(context, filter) {
            setTimeout(() => {
                context.commit('updateFilter', filter)
            }, context.state.timeout)
        },
        checkAllTodos(context, checked) {
            setTimeout(() => {
                context.commit('checkAllTodos', checked)
            }, context.state.timeout)
        }
    }
});
