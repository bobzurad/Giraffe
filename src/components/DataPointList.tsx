import {useCallback} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useAtom} from 'jotai';
import {Divider, IconButton, List} from 'react-native-paper';
import {chartDataAtom} from '../context/atoms';

const DataPointList = () => {
  const [chartData] = useAtom(chartDataAtom);

  const editIcon = useCallback(
    () => (
      <IconButton
        icon="pencil-outline"
        style={styles.editIcon}
        onPress={() => console.log('Pressed')}
      />
    ),
    [],
  );

  const deleteIcon = useCallback(
    () => (
      <IconButton
        icon="trash-can-outline"
        onPress={() => console.log('Pressed')}
      />
    ),
    [],
  );

  const itemSeparator = useCallback(() => <Divider />, []);

  return (
    <FlatList
      contentContainerStyle={styles.flatListContainer}
      data={chartData}
      keyExtractor={item => item.date + Math.random().toString()}
      ItemSeparatorComponent={itemSeparator}
      renderItem={({item}) => {
        return (
          <List.Item
            style={styles.itemContainer}
            title={item.value.toString() + ' ' + item.unit}
            description={item.date?.toDateString()}
            left={editIcon}
            right={deleteIcon}
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  editIcon: {
    marginLeft: 16,
  },
  itemContainer: {
    backgroundColor: 'white',
  },
  flatListContainer: {},
});

export default DataPointList;
