import { useState } from "react"
import { IUserFilterConfig } from "../../types/users"

interface IUserFilterProps {
    filterConfig: IUserFilterConfig[]
    onFilterConfigChange: (filterConfig: IUserFilterConfig[]) => void
}

export const UserFilters = (props:IUserFilterProps) => {
    const [filterConfigState, setFilterConfigState] = useState([...props.filterConfig])
    const onChange = (evt: never) => {
        // @ts-ignore TODO: Fix Types
        const {id, value} = evt.target
        const newState =filterConfigState.map((config) => {
            return config.id === id ? {...config, value} : config
        })
        setFilterConfigState(newState)
    }
    
    const onFormSubmit = (evt: never) => {
        // @ts-ignore TODO: Fix Types
        evt.preventDefault();
        props.onFilterConfigChange(filterConfigState)
    }
    return <form onSubmit={onFormSubmit}>
        {filterConfigState.map((configItem) => {
            return <input name={configItem.id} id={configItem.id} placeholder={configItem.label} onChange={onChange} value={configItem.value} />
        })}
        <input type="submit" />
    </form>
}