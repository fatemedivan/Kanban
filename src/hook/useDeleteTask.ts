import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../services/columns";

const useDeleteTask = () => {
  const client = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["columns"] });
    },
  });
  return { mutate };
};
export default useDeleteTask;
