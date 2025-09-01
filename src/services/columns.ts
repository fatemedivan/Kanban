import url from "../api/axios";
import type { Columns, Task } from "../types";

export const getColumns = async () => {
  const res = await url.get("/columns");
  return res.data;
};

export const deleteColumn = async (id: number | string) => {
  const res = await url.delete(`/columns/${id}`);
  return res.data;
};

export const addColumn = async (data: Columns) => {
  const res = await url.post("/columns", data);
  return res.data;
};

export const addTask = async ({
  colId,
  data,
}: {
  colId: string | number;
  data: { title: string; id: string | number };
}) => {
  const res = await url.get(`/columns/${colId}`);
  const column = res.data;

  const updatedTask = [...(column.tasks || []), data];

  const patchResponse = await url.patch(`/columns/${colId}`, {
    tasks: updatedTask,
  });
  return patchResponse.data;
};

export const deleteTask = async ({
  colId,
  taskId,
}: {
  colId: string | number;
  taskId: string | number;
}) => {
  const res = await url.get(`/columns/${colId}`);
  const column = res.data;

  const updatedTasks = (column.tasks || []).filter(
    (task: Task) => String(task.id) !== String(taskId)
  );

  const deleteRes = await url.patch(`/columns/${colId}`, {
    tasks: updatedTasks,
  });
  return deleteRes.data;
};
export const editTask = async ({
  colId,
  taskId,
  newTitle,
}: {
  colId: string | number;
  taskId: string | number;
  newTitle: { title: string };
}) => {
  const res = await url.get(`/columns/${colId}`);
  const column = res.data;

  const tasks: Task[] = [...(column.tasks || [])];
  const taskIndex = tasks.findIndex((task: Task) => task.id === taskId);
  tasks[taskIndex] = { ...tasks[taskIndex], title: newTitle.title };
  const responseEdit = await url.patch(`/columns/${colId}`, {
    tasks,
  });

  return responseEdit.data;
};
