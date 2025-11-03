import {useCallback} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useAtom, useAtomValue} from 'jotai';
import {Divider, IconButton, List} from 'react-native-paper';
import {
  deleteDataPointDialogVisibleAtom,
  selectedDataPointAtom,
  listDataAtom,
} from '../context/atoms';

const DataPointList = () => {
  const dataPoints = useAtomValue(listDataAtom);
  const [, setDeleteDataPointDialogVisible] = useAtom(
    deleteDataPointDialogVisibleAtom,
  );
  const [, setSelectedDataPointAtom] = useAtom(selectedDataPointAtom);

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
    (selectedId: string) => (
      <IconButton
        icon="trash-can-outline"
        onPress={() => {
          setSelectedDataPointAtom(selectedId);
          setDeleteDataPointDialogVisible(true);
        }}
      />
    ),
    [setSelectedDataPointAtom, setDeleteDataPointDialogVisible],
  );

  const itemSeparator = useCallback(() => <Divider />, []);

  return (
    <FlatList
      contentContainerStyle={styles.flatListContainer}
      data={dataPoints}
      keyExtractor={item => item.date + Math.random().toString()}
      ItemSeparatorComponent={itemSeparator}
      renderItem={({item}) => {
        return (
          <List.Item
            style={styles.itemContainer}
            title={item.value.toString() + ' ' + item.unit}
            description={item.date?.toDateString()}
            left={() => editIcon()}
            right={() => deleteIcon(item.id)}
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
