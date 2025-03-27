import { useEffect, useState } from "react"
import { IUser, IUserFilterConfig, USER_FILTER_CONFIG } from "../../types/users"
import { fetchUsers } from "../../api/users/fetchUsers"
import { UserTable } from "../../components/UserTable/UserTable"
import { IPaginationPayload } from "../../types/base"
import { UserPagination } from "../../components/UserPagination/UserPagination"
import { UserFilters } from "../../components/UserFilters/UserFilters"

const DEFAULT_PAGINATION = {
    offset: 0,
    pageSize: 10,
    total: 0
}

export const UserTableContainer = () => {
    const [isLoading, setLoading] = useState(true) 
    const [error, setError] = useState('') 
    const [users, setUsers] = useState<IUser[]>([])
    const [pagination, setPagination] = useState<IPaginationPayload>({
        ...DEFAULT_PAGINATION
    })
    const [filterConfig, setFilterConfig] = useState<IUserFilterConfig[]>([...USER_FILTER_CONFIG])

    const fetchUsersCall = (paginationPayload: IPaginationPayload, filterConfigPayload:IUserFilterConfig[] ) => {
            setLoading(true)
            fetchUsers({
                pagination: paginationPayload,
                filterConfig: filterConfigPayload
            }).then((apiUser) => {
                setUsers(apiUser.data)
                setPagination((pagination) => ({...pagination, total: apiUser.total}))
                setLoading(false)
            }).catch(() => {
                setLoading(false);
                setError('Error: Please try again')
            })
    }

    useEffect(() => {
        fetchUsersCall(pagination, filterConfig);
    }, [])

    const onPaginationChange = (paginationPayload: IPaginationPayload) => {
        fetchUsersCall(paginationPayload, filterConfig)
        setPagination(paginationPayload)
    }

    const onFilterChange = (filterConfigPayload: IUserFilterConfig[]) => {
        fetchUsersCall({...DEFAULT_PAGINATION}, filterConfigPayload)
        setPagination({...DEFAULT_PAGINATION})
        setFilterConfig(filterConfigPayload)
    }


    if(error) {
        return <div className="userTableContainer">{error}</div>
    }
    
    if(isLoading) 
        return <div className="userTableContainer">Loading...</div>
    
    return <div className="userTableContainer">
        <UserFilters filterConfig={filterConfig} onFilterConfigChange={onFilterChange} />
        <UserTable users={users} />
        <hr />
        <UserPagination onPaginationChange={onPaginationChange} pagination={pagination} />
    </div>
}