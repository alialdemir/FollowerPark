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
        const runningTaskIndex = state.tasks.map((item) => item.id).indexOf(taskInfo.id);
        if (runningTaskIndex >= 0) {
            state.tasks[runningTaskIndex] = Object.assign(state.tasks[runningTaskIndex], { status: 1 });

            const runningTasksInterval = Object.assign([], state.runningTasksInterval);
            runningTasksInterval.push(taskInfo);
            state.runningTasksInterval = runningTasksInterval;
        }
    },

    TASK_STOP(state, id) {
        const runningTaskIndex = state.tasks.map((item) => item.id).indexOf(id);
        if (runningTaskIndex >= 0) {
            state.tasks[runningTaskIndex] = Object.assign(state.tasks[runningTaskIndex], { status: 0 });

            const taskInterval = state.runningTasksInterval.filter((item) => item.id === id)[0];
            if (taskInterval) {
                clearInterval(taskInterval.interval);
                state.runningTasksInterval.splice(taskInterval, 1);
            }
        }
    },
}

export default taskConfigurationsMutations