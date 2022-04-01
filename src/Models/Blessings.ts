import { Fated, GetDefaultFated } from './Fated';
import { Identable } from './Helpers/Collections';
import Blessings from '../Data/Blessings.json';

export type Blessing = BlessingData & Identable;
export type BlessingData = {
    name: string;
    fated: Fated;
    level: number;
    effect: string;
};

export function GetDefaultBlessings(): Blessing[] {
    return defaultBlessings;
}

const blessingsData = Blessings;

const defaultBlessings = blessingsData.map((x, i) => ({ ...x, fated: GetDefaultFated()[x.fated - 1], key: i }));

/*
$once
[
$each
{
"name": "$1",
"effect": "$2",
"level": $0,
"fated": 1
},
{
"name": "$3",
"effect": "$4",
"level": $0,
"fated": 2
},
{
"name": "$5",
"effect": "$6",
"level": $0,
"fated": 3
},
{
"name": "$7",
"effect": "$8",
"level": $0,
"fated": 4
},
{
"name": "$9",
"effect": "$10",
"level": $0,
"fated": 5
},
{
"name": "$11",
"effect": "$12",
"level": $0,
"fated": 6
},
$once
]
*/
