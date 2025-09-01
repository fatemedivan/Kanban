import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteColumn } from "../services/columns"

const useDeleteColumn = ()=>{
    const client = useQueryClient()
    const {mutate}= useMutation({
        mutationFn: deleteColumn,
        onSuccess:()=>{
            client.invalidateQueries({queryKey: ['columns']})
        }
    })
    return {mutate}
}
export default useDeleteColumn