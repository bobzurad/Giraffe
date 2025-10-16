import React from 'react';
import {StatusBar, StyleSheet, Text, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {FAB, Portal} from 'react-native-paper';
import {useAtom} from 'jotai';
import {addDataPointDialogVisibleAtom} from './context/atoms';
import WelcomeSection from './components/WelcomeSection';
import LineChartDemo from './components/LineChartDemo';
import DataPointList from './components/DataPointList';
import AddDataPointDialog from './components/AddDataPointDialog';

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 8,
    bottom: 8,
  },
});

function App(): React.JSX.Element {
  const [, setAddDataPointDialogVisible] = useAtom(
    addDataPointDialogVisibleAtom,
  );
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <LineChartDemo />
      <DataPointList />
      <WelcomeSection title="Step One">
        Edit <Text style={styles.highlight}>App.tsx</Text> to change this screen
        and then come back to see your edits.
      </WelcomeSection>
      <Portal>
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => {
            setAddDataPointDialogVisible(true);
          }}
        />
      </Portal>
      <AddDataPointDialog />
    </View>
  );
}

export default App;
