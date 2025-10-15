import {atom} from 'jotai';

type DataPoint = {
  date: Date;
  value: number;
  unit: string;
};

type DataPoints = DataPoint[];

export const chartDataAtom = atom([
  {value: 160, unit: 'lbs'},
  {value: 150, unit: 'lbs'},
  {value: 143, unit: 'lbs'},
  {value: 146, unit: 'lbs'},
] as DataPoints);
