import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  SafeAreaView,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {FAB, Portal} from 'react-native-paper';
import {useAtom} from 'jotai';
import {addDataPointDialogVisibleAtom} from './context/atoms';
import WelcomeSection from './components/WelcomeSection';
import LineChartDemo from './components/LineChartDemo';
import DataPointList from './components/DataPointList';
import AddDataPointDialog from './components/AddDataPointDialog';

function App(): React.JSX.Element {
  const [, setAddDataPointDialogVisible] = useAtom(
    addDataPointDialogVisibleAtom,
  );
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={{...backgroundStyle, ...styles.flexContainer}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.flexContainer}>
        <LineChartDemo />
        <DataPointList />
        <View style={styles.welcome}>
          <WelcomeSection title="Step One">
            Edit <Text>App.tsx</Text> to change this screen and then come back
            to see your edits.
          </WelcomeSection>
        </View>
      </View>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 8,
    bottom: 8,
  },
  welcome: {
    marginBottom: 20,
  },
});

export default App;
