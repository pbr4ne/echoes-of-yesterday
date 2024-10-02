import { ref } from 'vue';
import { useGameLoop } from './useGameLoop';

export function useTasks(taskGroups: any[], handleTaskCompletion: (id: string) => void) {
  const taskIds = taskGroups.flatMap(card => card.tasks.map((task: { id: any; }) => task.id));
  const progress = ref(Object.fromEntries(taskIds.map(id => [id, 0])));
  const activeTask = ref(Object.fromEntries(taskIds.map(id => [id, false])));

  const { subscribe } = useGameLoop();

  subscribe((tick: number) => {
    taskIds.forEach((id) => {
      if (activeTask.value[id] && progress.value[id] < 100) {
        progress.value[id] += 1;
      }
      if (progress.value[id] >= 100) {
        activeTask.value[id] = false;
        progress.value[id] = 0;
        handleTaskCompletion(id);
      }
    });
  });

  const startProgress = (taskId: keyof typeof progress.value) => {
    if (progress.value[taskId] < 100) {
      activeTask.value[taskId] = true;
    }
  };

  const buttonProgressStyle = (progressValue: number) => ({
    backgroundImage: `linear-gradient(90deg, #43738B ${progressValue}%, transparent 0%)`,
    transition: 'background 0.3s'
  });

  return {
    progress,
    activeTask,
    startProgress,
    buttonProgressStyle,
  };
}
