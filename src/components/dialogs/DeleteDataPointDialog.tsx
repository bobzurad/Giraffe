import {StyleSheet, View} from 'react-native';
import {useAtom} from 'jotai';
import {Button, Dialog, MD3Colors, Portal, Text} from 'react-native-paper';
import {
  deleteDataPointDialogVisibleAtom,
  dataPointsAtom,
} from '../../context/atoms';

const errorColor = MD3Colors.error50;

const DeleteDataPointDialog = () => {
  const [dataPoints, setDataPoints] = useAtom(dataPointsAtom);
  const [deleteDataPointDialogVisible, setDeleteDataPointDialogVisible] =
    useAtom(deleteDataPointDialogVisibleAtom);

  const deleteDataPoint = () => {
    //todo: remove from dataPoints
    setDataPoints(dataPoints);
    closeDialog();
  };

  const closeDialog = () => {
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
            <Text variant="bodyMedium">
              Are you sure you want to delete the following entry?
            </Text>
            <Text style={styles.content}>Data Point Info Goes Here</Text>
            <Text variant="bodyMedium" style={styles.warning}>
              This action is irreversable.
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
  warning: {
    color: errorColor,
  },
});

export default DeleteDataPointDialog;
