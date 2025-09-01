import { useQuery } from "@tanstack/react-query"
import { getColumns } from "../services/columns"
import type { Columns } from "../types"

const useGetColumns = ()=>{
    const {data}= useQuery<Columns[]>({
        queryKey: ['columns'],
        queryFn: getColumns
    })
    return {data}
}
export default useGetColumns