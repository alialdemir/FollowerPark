const indexedDMutations = {

    SET_TASK(state, tasks) {
        state.tasks = tasks;
    },

    DELETE_TASK(state, taskId) {
        const task = state.tasks.filter((item) => item.taskId === taskId)[0];
        if (task) {
            state.tasks.splice(task, 1);
        }
    }
}

export default indexedDMutations