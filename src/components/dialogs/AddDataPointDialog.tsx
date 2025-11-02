import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useAtom} from 'jotai';
import {
  Button,
  Dialog,
  HelperText,
  Portal,
  TextInput,
} from 'react-native-paper';
import {
  addDataPointDialogVisibleAtom,
  dataPointsAtom,
} from '../../context/atoms';

const styles = StyleSheet.create({
  inputValue: {
    fontSize: 32,
  },
});

const AddDataPointDialog = () => {
  const [inputValue, setInputValue] = useState('');
  const [dataPoints, setDataPoints] = useAtom(dataPointsAtom);
  const [addDataPointDialogVisible, setAddDataPointDialogVisible] = useAtom(
    addDataPointDialogVisibleAtom,
  );

  const addDataPoint = () => {
    dataPoints.push({
      date: new Date(),
      label: new Date().toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
      }),
      value: Number(inputValue),
      unit: 'lbs',
    });
    setDataPoints(dataPoints);
    closeDialog();
  };

  const closeDialog = () => {
    setAddDataPointDialogVisible(false);
    setInputValue('');
  };

  return (
    <View>
      <Portal>
        <Dialog
          visible={addDataPointDialogVisible}
          onDismiss={() => setAddDataPointDialogVisible(false)}>
          <Dialog.Title>Add Measurement</Dialog.Title>
          <Dialog.Content>
            <TextInput
              mode="outlined"
              value={inputValue}
              style={styles.inputValue}
              onChangeText={text => setInputValue(text)}
              error={inputValue.length > 0 && !Number(inputValue)}
              autoFocus={true}
            />
            <HelperText
              type="error"
              visible={inputValue.length > 0 && !Number(inputValue)}>
              Error: Only numbers are allowed
            </HelperText>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeDialog}>Cancel</Button>
            <Button onPress={addDataPoint}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default AddDataPointDialog;
