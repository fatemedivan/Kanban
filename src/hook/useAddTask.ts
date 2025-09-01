import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTask } from "../services/columns";

const useAddTask = (reset: ()=>void) => {
  const client = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["columns"] });
      reset()
    },
  });
  return { mutate };
};
export default useAddTask
