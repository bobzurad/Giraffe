import {atom} from 'jotai';

// --------------- Types ----------------------------------------- //

type DataPoint = {
  date: Date;
  value: number;
  unit: string;
};

type DataPoints = DataPoint[];

type SetChartDataArgs = {
  shouldSort: boolean;
};

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
  get => {
    // sort the data when getting the data
    const chartData = get(_chartDataAtom);
    return chartData.sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    });
  },
  // setter uses args object to determine if sort should happen
  (get, set, args: SetChartDataArgs) => {
    if (args.shouldSort) {
      set(_chartDataAtom, chartData =>
        chartData.sort((a, b) => {
          return b.date.getTime() - a.date.getTime();
        }),
      );
    } else {
      set(_chartDataAtom, chartData => chartData);
    }
  },
);

export const addDataPointDialogVisibleAtom = atom(false);
