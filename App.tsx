// App.tsx
import 'react-native-gesture-handler';
import * as React from 'react';
// import {Button, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import {createDrawerNavigator} from '@react-navigation/drawer';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import PushNotification from 'react-native-push-notification';

import store from './src/redux/store';

import Login from './src/login';
import Home from './src/home';

const Stack = createStackNavigator();

const HomeScreen: React.FC = () => {
  return <Home />;
};

// eslint-disable-next-line react/no-unstable-nested-components
const LoginScreen: React.FC<{navigation: any}> = ({navigation}) => {
  return <Login navigation={navigation} />;
};

const App: React.FC = () => {
  React.useEffect(() => {
    // console.log('PushNotification ::', PushNotification);
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);

        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      onPermissionRequest: function (status) {
        console.log('PERMISSION:', status);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  }, []);

  // function NotificationsScreen({navigation}) {
  //   return (
  //     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
  //       <Button onPress={() => navigation.goBack()} title="Go back home" />
  //     </View>
  //   );
  // }

  // const Drawer = createDrawerNavigator();

  // const DrawerNavWrapper = () => {
  //   <Drawer.Navigator>
  //     <Drawer.Screen name="Home" component={HomeScreen} />
  //     <Drawer.Screen name="Notifications" component={NotificationsScreen} />
  //   </Drawer.Navigator>;
  // };

  // const StackNavWrapper = () => {
  //   <Stack.Navigator initialRouteName="LoginScreen">
  //     <Stack.Screen name="Login" component={LoginScreen} />
  //     <Stack.Screen name="Home" component={HomeScreen} />
  //   </Stack.Navigator>;
  // };

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
