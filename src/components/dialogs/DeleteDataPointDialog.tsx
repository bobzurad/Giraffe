import {StyleSheet, View} from 'react-native';
import {useAtom} from 'jotai';
import {Button, Dialog, MD3Colors, Portal, Text} from 'react-native-paper';
import {
  deleteDataPointDialogVisibleAtom,
  dataPointsAtom,
  selectedDataPointAtom,
} from '../../context/atoms';

const errorColor = MD3Colors.error50;

const DeleteDataPointDialog = () => {
  const [dataPoints, setDataPoints] = useAtom(dataPointsAtom);
  const [deleteDataPointDialogVisible, setDeleteDataPointDialogVisible] =
    useAtom(deleteDataPointDialogVisibleAtom);
  const [selectedDataPointId, setSelectedDataPointAtom] = useAtom(
    selectedDataPointAtom,
  );
  const selectedDataPoint = dataPoints.find(dataPoint => {
    return dataPoint.id === selectedDataPointId;
  });

  const deleteDataPoint = () => {
    const indexToDelete = dataPoints.findIndex(
      dataPoint => dataPoint.id === selectedDataPointId,
    );
    dataPoints.splice(indexToDelete, 1);
    setDataPoints(dataPoints);
    closeDialog();
  };

  const closeDialog = () => {
    setSelectedDataPointAtom('');
    setDeleteDataPointDialogVisible(false);
  };

  return (
    <View>
      <Portal>
        <Dialog
          visible={deleteDataPointDialogVisible}
          onDismiss={() => setDeleteDataPointDialogVisible(false)}>
          <Dialog.Icon icon="alert" color={errorColor} size={32} />
          <Dialog.Title style={styles.title}>Delete Measurement</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyLarge">
              Are you sure you want to delete the following entry? {'\n'}
            </Text>
            <Text style={styles.content}>
              <Text style={styles.value}>
                {selectedDataPoint?.value +
                  ' ' +
                  selectedDataPoint?.unit +
                  '\n\n'}
              </Text>
              <Text style={styles.date}>
                {selectedDataPoint?.date.toDateString()}
              </Text>
            </Text>
            <Text variant="bodyLarge" style={styles.warning}>
              This action is irreversable!
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeDialog}>Cancel</Button>
            <Button onPress={deleteDataPoint} textColor={errorColor}>
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
  content: {
    textAlign: 'center',
  },
  value: {
    textAlign: 'center',
    fontSize: 24,
    paddingTop: '20%',
  },
  date: {
    fontSize: 18,
    paddingTop: '20%',
  },
  warning: {
    color: errorColor,
    paddingTop: '5%',
  },
});

export default DeleteDataPointDialog;
