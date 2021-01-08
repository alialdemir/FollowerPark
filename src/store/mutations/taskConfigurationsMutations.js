const taskConfigurationsMutations = {

    SET_TASK_CONFIGURATIONS(state, config) {
        const key = Object.keys(config);
        const taskConfigurations = {
            ...state.taskConfigurations,
        }

        for (let i = 0; i < key.length; i++) {
            taskConfigurations[key[i]] = config[key[i]];
        }

        state.taskConfigurations = taskConfigurations;
    },

    TASK_START(state, taskInfo) {
        const taskIndex = state.tasks.map((item) => item.taskId).indexOf(taskInfo.taskId);
        if (taskIndex >= 0) {
            state.tasks[taskIndex] = Object.assign(state.tasks[taskIndex], { status: true });
        }
    },

    TASK_STOP(state, taskId) {
        const taskIndex = state.tasks.findIndex((item) => item.taskId === taskId);
        if (taskIndex >= 0) {
            state.tasks[taskIndex] = Object.assign(state.tasks[taskIndex], { status: false });
        }
    },

    SET_TASK(state, tasks) {
        state.tasks = tasks;
    },

    DELETE_TASK(state, taskId) {
        const task = state.tasks.filter((item) => item.taskId === taskId)[0];
        if (task) {
            state.tasks.splice(task, 1);
        }
    },

    UPDATE_TASK(state, task) {
        const taskIndex = state.tasks.findIndex((item) => item.taskId === task.taskId);
        if (taskIndex >= 0) {
            state.tasks[taskIndex] = Object.assign(state.tasks[taskIndex], { ...task });
        }
    }
}

export default taskConfigurationsMutations