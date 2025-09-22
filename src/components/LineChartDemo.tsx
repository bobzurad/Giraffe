import {LineChart} from 'react-native-gifted-charts';

const LineChartDemo = () => {
  const data = [
    {value: 160},
    {value: 150},
    {value: 143},
    {value: 146},
  ];

  return <LineChart
    data={data}
    curved
    yAxisOffset={140}
  />;
};

export default LineChartDemo;
