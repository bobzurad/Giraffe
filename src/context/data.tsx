import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {DataPoint} from './types';

const getDateMinusDays = (numDays: number): Date => {
  return new Date(new Date().setDate(new Date().getDate() - numDays));
};

const getLabel = (numDays: number): string => {
  return getDateMinusDays(numDays).toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
  });
};

const seedData = [
  {
    id: uuidv4(),
    date: getDateMinusDays(5),
    label: getLabel(5),
    value: 160,
    unit: 'lbs',
  },
  {
    id: uuidv4(),
    date: getDateMinusDays(3),
    label: getLabel(3),
    value: 150,
    unit: 'lbs',
  },
  {
    id: uuidv4(),
    date: getDateMinusDays(4),
    label: getLabel(4),
    value: 143,
    unit: 'lbs',
  },
  {
    id: uuidv4(),
    date: getDateMinusDays(2),
    label: getLabel(2),
    value: 146,
    unit: 'lbs',
  },
] as DataPoint[];

export {seedData};
