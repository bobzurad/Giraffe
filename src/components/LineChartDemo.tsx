import {StyleSheet, View} from 'react-native';
import {useAtomValue} from 'jotai';
import {LineChart} from 'react-native-gifted-charts';
import {chartDataAtom} from '../context/atoms';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '5%',
    paddingTop: '15%',
    paddingRight: '5%',
  },
});

const LineChartDemo = () => {
  const dataPoints = useAtomValue(chartDataAtom);

  return (
    <View style={styles.container}>
      <LineChart
        key={dataPoints.length} // chart will re-render when key changes
        data={dataPoints} // chart does not re-render when data changes
        curved
        yAxisOffset={140}
        isAnimated
        focusEnabled
      />
    </View>
  );
};

export default LineChartDemo;
