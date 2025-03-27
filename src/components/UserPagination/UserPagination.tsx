import { IPaginationPayload } from "../../types/base"

const PAGE_SIZE = [10, 20, 30]

interface IUserPagination {
    onPaginationChange: (payload: IPaginationPayload) => void
    pagination: IPaginationPayload
}

export const UserPagination = (props: IUserPagination) => {
    const {onPaginationChange, pagination}  = props

    const onForward = () => {
        onPaginationChange({...pagination, offset: pagination.offset + pagination.pageSize})
    }

    const onBackward = () => {
        onPaginationChange({...pagination, offset: pagination.offset - pagination.pageSize})
    }

    const onPageSizeChanged = (evt: never) => {
        // @ts-ignore TODO: Update with HTML Event Type here
        const val = evt?.target?.value;
        onPaginationChange({...pagination, pageSize: parseInt(val)})
    }

    return <div className="pagination">
        <select value={props.pagination.pageSize} onChange={onPageSizeChanged}>
            {PAGE_SIZE.map((op) => {
                return <option value={op}>Show {op} Users</option>
            })}
        </select>
        <button onClick={onBackward} disabled={pagination.offset === 0}>Prev</button>
        <button onClick={onForward} disabled={(pagination.offset + pagination.pageSize) >= pagination.total}>Next</button>
    </div>
}