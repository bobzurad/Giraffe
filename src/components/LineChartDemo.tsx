import {StyleSheet, View} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '5%',
    paddingTop: '15%',
    paddingRight: '5%',
  },
});

const LineChartDemo = () => {
  const data = [{value: 160}, {value: 150}, {value: 143}, {value: 146}];

  return (
    <View style={styles.container}>
      <LineChart data={data} curved yAxisOffset={140} />
    </View>
  );
};

export default LineChartDemo;
