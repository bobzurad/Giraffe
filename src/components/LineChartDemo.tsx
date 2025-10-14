import {StyleSheet, View} from 'react-native';
import {useAtom} from 'jotai';
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
  const [chartData] = useAtom(chartDataAtom);

  return (
    <View style={styles.container}>
      <LineChart data={chartData} curved yAxisOffset={140} />
    </View>
  );
};

export default LineChartDemo;
