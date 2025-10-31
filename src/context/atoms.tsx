import {atom} from 'jotai';

// --------------- Types & Enums --------------------------------- //

export enum SortDirection {
  ASC,
  DESC,
  NONE, // do not sort
}

type DataPoint = {
  date: Date;
  label: string;
  value: number;
  unit: string;
};

type DataPoints = DataPoint[];

type SetChartDataArgs = {
  sortDirection: SortDirection;
};

// --------------- Internal Functions ---------------------------- //

function getDateMinusDays(numDays: number): Date {
  return new Date(new Date().setDate(new Date().getDate() - numDays));
}

function getLabel(numDays: number): string {
  return getDateMinusDays(numDays).toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
  });
}

// --------------- Internal Atoms -------------------------------- //

const _chartDataAtom = atom([
  {
    date: getDateMinusDays(5),
    label: getLabel(5),
    value: 160,
    unit: 'lbs',
  },
  {
    date: getDateMinusDays(3),
    label: getLabel(3),
    value: 150,
    unit: 'lbs',
  },
  {
    date: getDateMinusDays(4),
    label: getLabel(4),
    value: 143,
    unit: 'lbs',
  },
  {
    date: getDateMinusDays(2),
    label: getLabel(2),
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
    if (args.sortDirection === SortDirection.ASC) {
      set(_chartDataAtom, chartData =>
        chartData.sort((a, b) => {
          return a.date.getTime() - b.date.getTime();
        }),
      );
    } else if (args.sortDirection === SortDirection.DESC) {
      set(_chartDataAtom, chartData =>
        chartData.sort((a, b) => {
          return b.date.getTime() - a.date.getTime();
        }),
      );
    } else {
      // do not sort
      set(_chartDataAtom, chartData => chartData);
    }
  },
);

export const addDataPointDialogVisibleAtom = atom(false);
