import { IPaginationPayload } from "../../types/base";
import { IFilterRule, IUserFilterConfig } from "../../types/users";
import { USER_MOCK } from "./__mock__/user.mock";

interface IFetchUsersPayload {
    pagination: IPaginationPayload;
    filterConfig: IUserFilterConfig[]
}

const filterUsers = (filterConfig: IUserFilterConfig[]) => {
    return USER_MOCK.filter((userItem) => {
        return filterConfig.reduce((acc, filterConfigItem) => {
            const valueStr = userItem[filterConfigItem.dataKey as never] as string
            const valueNum = userItem[filterConfigItem.dataKey as never] as number
            const filterValueNum = filterConfigItem.value as number
            switch(filterConfigItem.rule) {
                case IFilterRule.includes:                    
                    return acc && (valueStr).includes(filterConfigItem.value as string)
                case IFilterRule.gt:
                        return filterValueNum !== undefined ? (acc && valueNum > filterValueNum) :  acc

                case IFilterRule.lt:
                    return filterValueNum !== undefined ? (acc && valueNum < filterValueNum) :  acc
                default:
                    return acc
            }
        }, true)
    })
}

export const fetchUsers = async (payload: IFetchUsersPayload) => {
    const pageOffset = payload.pagination.offset || 0
    const pageSize = payload.pagination.pageSize || 10
    const filteredUsers = filterUsers(payload.filterConfig)
    return {
        data: filteredUsers.slice(pageOffset, pageOffset + pageSize),
        total: USER_MOCK.length
    }
}