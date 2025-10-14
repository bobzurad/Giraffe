import {atom} from 'jotai';

type DataPoint = {
  date: Date,
  value: number
}

type DataPoints = DataPoint[];

export const chartDataAtom = atom([
  {value: 160},
  {value: 150},
  {value: 143},
  {value: 146},
] as DataPoints);
