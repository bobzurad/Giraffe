import {atom} from 'jotai';
import {DataPoint} from './types';
import {seedData} from './data';

// --------------- Internal Atoms (do not export!!!) ------------- //

// atom configs define the data types and inital values for the derived atoms
const _dataPointsAtomConfig = atom<DataPoint[]>([...seedData]);
const _chartDataAtomConfig = atom<DataPoint[]>([...seedData]);
const _listDataAtomConfig = atom<DataPoint[]>([...seedData]);

// derived atom that defines rules when getting and setting data
const _chartDataAtom = atom(
  get => {
    // chart data is sorted asc
    return get(_chartDataAtomConfig).sort((a, b) => {
      return a.date.getTime() - b.date.getTime();
    });
  },
  (get, set, updatedDataPoints: DataPoint[]) => {
    set(
      _chartDataAtomConfig,
      updatedDataPoints.sort((a, b) => {
        return a.date.getTime() - b.date.getTime();
      }),
    );
  },
);

// derived atom that defines rules when getting and setting data
const _listDataAtom = atom(
  get => {
    // list data is sorted desc
    return get(_listDataAtomConfig).sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    });
  },
  (get, set, updatedDataPoints: DataPoint[]) => {
    set(
      _listDataAtomConfig,
      updatedDataPoints.sort((a, b) => {
        return b.date.getTime() - a.date.getTime();
      }),
    );
  },
);

// --------------- Atoms used by Components ---------------------- //

// this is the main read/write atom for data points
export const dataPointsAtom = atom(
  get => get(_dataPointsAtomConfig),
  (get, set, updatedDataPoints: DataPoint[]) => {
    set(_dataPointsAtomConfig, updatedDataPoints);
    // set derived atoms
    set(_chartDataAtom, [
      ...updatedDataPoints.sort((a, b) => {
        return a.date.getTime() - b.date.getTime();
      }),
    ]);
    set(_listDataAtom, [
      ...updatedDataPoints.sort((a, b) => {
        return b.date.getTime() - a.date.getTime();
      }),
    ]);
  },
);

// derived read-only atom that components use to read chart data
export const chartDataAtom = atom(get => get(_chartDataAtom));

// derived read-only atom that components use to read list data
export const listDataAtom = atom(get => get(_listDataAtom));

export const addDataPointDialogVisibleAtom = atom(false);
