import {ScrollView} from 'react-native';
import {useAtom} from 'jotai';
import {List} from 'react-native-paper';
import {chartDataAtom} from '../context/atoms';

const DataPointList = () => {
  const [chartData] = useAtom(chartDataAtom);

  return (
    <ScrollView>
      <List.Section title="Measurements">
        {chartData.map((dataPoint, index) => {
          return (
            <List.Item
              key={index}
              title={dataPoint.value.toString() + ' ' + dataPoint.unit}
            />
          );
        })}
      </List.Section>
    </ScrollView>
  );
};

export default DataPointList;
