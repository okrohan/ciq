export interface IUser {
    id: number;
    name: string;
    age: number;
    occupation: string;
}

export enum IFilterRule {
    includes = 'includes',
    gt = 'gt',
    lt = 'lt'
}

export interface IUserFilterConfig {
        id: string;
        label: string;
        rule: IFilterRule;
        dataKey: string;
        inputType: string;
        value?: string | number
}

export const USER_FILTER_CONFIG: IUserFilterConfig[] = [{
    id: 'name',
    label: 'Name',
    rule: IFilterRule.includes,
    dataKey: 'name',
    inputType: 'text',
    value: ''
},
{
    id: 'minAge',
    label: 'Min Age',
    rule: IFilterRule.gt,
    dataKey: 'age',
    inputType: 'number',
    value: undefined
},
{
    id: 'maxAge',
    label: 'Max Age',
    rule: IFilterRule.lt,
    dataKey: 'age',
    inputType: 'number'
},
{
    id: 'occupation',
    label: 'Occupation',
    rule: IFilterRule.includes,
    dataKey: 'occupation',
    inputType: 'text',
    value: ''
}
]
