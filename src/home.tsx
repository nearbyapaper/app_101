import React, {useState, useMemo} from 'react';
import {BottomNavigation, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import HomePage from '../src/home/index';

const Home = (): JSX.Element => {
  const [index, setIndex] = useState(0);

  const routes = useMemo(
    () => [
      {key: 'feat1', title: 'Home'},
      {key: 'feat2', title: 'Watchlist'},
      {key: 'feat3', title: 'Tools'},
      {key: 'feat4', title: 'Settings'},
    ],
    [],
  );

  const renderScene = useMemo(
    () =>
      BottomNavigation.SceneMap({
        feat1: () => <HomePage />,
        feat2: () => <Text>Watchlist</Text>,
        feat3: () => <Text>Tools</Text>,
        feat4: () => <Text>Settings</Text>,
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
