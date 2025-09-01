import { useMutation, useQueryClient } from "@tanstack/react-query"
import { editTask } from "../services/columns"

const useEditTask = (reset: ()=> void)=>{
    const client = useQueryClient()
    const {mutate}= useMutation({
        mutationFn: editTask,
        onSuccess:()=>{
            client.invalidateQueries({queryKey: ['columns']})
            reset()
        }
    })
    return {mutate}
}

export default useEditTask