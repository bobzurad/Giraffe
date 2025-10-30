import {atom} from 'jotai';

// --------------- Types ----------------------------------------- //

type DataPoint = {
  date: Date;
  value: number;
  unit: string;
};

type DataPoints = DataPoint[];

// --------------- Internal Atoms -------------------------------- //

const _chartDataAtom = atom([
  {
    date: new Date(new Date().setDate(new Date().getDate() - 5)),
    value: 160,
    unit: 'lbs',
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 3)),
    value: 150,
    unit: 'lbs',
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 4)),
    value: 143,
    unit: 'lbs',
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 2)),
    value: 146,
    unit: 'lbs',
  },
] as DataPoints);


// --------------- Atoms used by Components ---------------------- //

export const chartDataAtom = atom(
  // components use the data sorted by date
  (get) => {
    // sort the data when getting the data
    const chartData = get(_chartDataAtom);
    return chartData.sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    });
  },
  (get, set) => {
    set(_chartDataAtom, chartData =>
      // sort the data after setting the data
      chartData.sort((a, b) => {
        return b.date.getTime() - a.date.getTime();
      }),
    );
  },
);

export const addDataPointDialogVisibleAtom = atom(false);
