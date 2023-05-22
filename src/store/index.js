import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      tasks: []
    };
  },
  mutations: {
    addTask(state, task) {
      state.tasks.push(task);
    },
    completeTask(state, task) {
      task.completed = true;
    },
    deleteTask(state, task) {
      const index = state.tasks.indexOf(task);
      state.tasks.splice(index, 1);
    }
  }

});


