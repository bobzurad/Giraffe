import {atom} from 'jotai';

// --------------- Types ----------------------------------------- //

type DataPoint = {
  date: Date;
  label: string;
  value: number;
  unit: string;
};

type DataPoints = DataPoint[];

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

// --------------- Seed Data ------------------------------------- //

const seedData = [
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
] as DataPoints;

// --------------- Internal Atoms -------------------------------- //

const _dataPointsAtom = atom([...seedData]);
const _chartDataAtom = atom([...seedData]);
const _listDataAtom = atom([...seedData]);

const __chartDataAtom = atom(
  get => {
    // chart data is sorted asc
    return get(_chartDataAtom).sort((a, b) => {
      return a.date.getTime() - b.date.getTime();
    });
  },
  (get, set, updatedDataPoints: DataPoints) => {
    set(
      _chartDataAtom,
      updatedDataPoints.sort((a, b) => {
        return a.date.getTime() - b.date.getTime();
      }),
    );
  },
);

const __listDataAtom = atom(
  get => {
    // list data is sorted desc
    return get(_listDataAtom).sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    });
  },
  (get, set, updatedDataPoints: DataPoints) => {
    set(
      _listDataAtom,
      updatedDataPoints.sort((a, b) => {
        return b.date.getTime() - a.date.getTime();
      }),
    );
  },
);

// --------------- Atoms used by Components ---------------------- //

// read/write atom for data points
export const dataPointsAtom = atom(
  get => get(_dataPointsAtom),
  (get, set, updatedDataPoints: DataPoints) => {
    set(_dataPointsAtom, updatedDataPoints);
    // set derived atoms
    set(__chartDataAtom, [
      ...updatedDataPoints.sort((a, b) => {
        return a.date.getTime() - b.date.getTime();
      }),
    ]);
    set(__listDataAtom, [
      ...updatedDataPoints.sort((a, b) => {
        return b.date.getTime() - a.date.getTime();
      }),
    ]);
  },
);

// read-only atom that components use to read chart data
export const chartDataAtom = atom(get => get(__chartDataAtom));

// read-only atom that components use to read list data
export const listDataAtom = atom(get => get(__listDataAtom));


// export const chartDataAtom = atom(
//   // components use the data sorted by date
//   get => {
//     // sort the data when getting the data
//     const chartData = get(_chartDataAtom);
//     return chartData.sort((a, b) => {
//       return b.date.getTime() - a.date.getTime();
//     });
//   },
//   // setter uses args object to determine if sort should happen
//   (get, set, args: SetChartDataArgs) => {
//     if (args.sortDirection === SortDirection.ASC) {
//       set(_chartDataAtom, chartData =>
//         chartData.sort((a, b) => {
//           return a.date.getTime() - b.date.getTime();
//         }),
//       );
//     } else if (args.sortDirection === SortDirection.DESC) {
//       set(_chartDataAtom, chartData =>
//         chartData.sort((a, b) => {
//           return b.date.getTime() - a.date.getTime();
//         }),
//       );
//     } else {
//       // do not sort
//       set(_chartDataAtom, chartData => chartData);
//     }
//   },
// );

export const addDataPointDialogVisibleAtom = atom(false);
