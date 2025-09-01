import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addColumn } from "../services/columns"

const useAddColumn = (reset: ()=>void)=>{
    const client = useQueryClient()
    const {mutate}= useMutation({
        mutationFn: addColumn,
        onSuccess: ()=>{
            client.invalidateQueries({queryKey: ['columns']})
            reset()
        }
    })
    return {mutate}
}
export default useAddColumn