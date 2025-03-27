import { IUser } from "../../types/users";

interface IUserTableProps {
    users: IUser[]
}

const USER_TABLE_FIELDS_META = [{id: 'id', name: 'ID'}, {id: 'name', name: 'Name'}, {id: 'age', name: 'Age'}, {id: 'occupation', name: 'Occupation'}]

export const UserTable = (props: IUserTableProps) => {
    return <table className="userTable">
        <tr>
            {USER_TABLE_FIELDS_META.map(meta => <th key={meta.id}>{meta.name}</th>)}
        </tr>
    
        {
            props.users.map((user) => {
                return <tr>
                    {USER_TABLE_FIELDS_META.map((meta) => {
                        return <td>{user[meta.id as never]}</td>
                    })}
                </tr>
            })
        }    
    </table>
}