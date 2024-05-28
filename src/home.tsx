import React, {useState, useMemo} from 'react';
import {BottomNavigation, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MyTask from './task';
import DailyMission from './daily';

const Home = (): JSX.Element => {
  const [index, setIndex] = useState(0);

  const routes = useMemo(
    () => [
      {key: 'feat1', title: 'Task'},
      {key: 'feat2', title: 'Daily Mission'},
      {key: 'feat3', title: 'Recents'},
      {key: 'feat4', title: 'Notifications'},
    ],
    [],
  );

  const renderScene = useMemo(
    () =>
      BottomNavigation.SceneMap({
        feat1: MyTask,
        feat2: DailyMission,
        feat3: () => <Text>Recents</Text>,
        feat4: () => <Text>Notifications</Text>,
      }),
    [],
  );

  return (
    <View style={styles.container}>
      <SafeAreaProvider style={styles.safeArea}>
        <BottomNavigation
          navigationState={{index, routes}}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
      </SafeAreaProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  safeArea: {flex: 1, paddingBottom: 10},
});

export default Home;
