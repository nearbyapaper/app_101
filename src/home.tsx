import React from 'react';

import {BottomNavigation, Text} from 'react-native-paper';
import Task from './task';
import {View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import DailyMission from './daily';

function Home(): JSX.Element {
  const MusicRoute = () => <Task />;

  const AlbumsRoute = () => <DailyMission />;

  const RecentsRoute = () => <Text>Recents</Text>;

  const NotificationsRoute = () => <Text>Notifications</Text>;

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'feat1',
      title: 'Task',
      // focusedIcon: 'heart',
      // unfocusedIcon: 'heart-outline',
    },
    {
      key: 'feat2',
      title: 'Daily Mission',
      // focusedIcon: 'album'
    },
    {
      key: 'feat3',
      title: 'Recents',
      // focusedIcon: 'history'
    },
    {
      key: 'feat4',
      title: 'Notifications',
      // focusedIcon: 'bell',
      // unfocusedIcon: 'bell-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    feat1: MusicRoute,
    feat2: AlbumsRoute,
    feat3: RecentsRoute,
    feat4: NotificationsRoute,
  });

  return (
    <View style={{flexDirection: 'column', flex: 1}}>
      <SafeAreaProvider>
        <BottomNavigation
          navigationState={{index, routes}}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
      </SafeAreaProvider>
    </View>
  );
}

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default Home;
