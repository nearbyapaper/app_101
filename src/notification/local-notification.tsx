import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

// const LocalNotification = () => {
//   const key = Date.now().toString(); // Key must be unique everytime
//   console.log('local notification key: ' + key);

//   PushNotification.createChannel(
//     {
//       channelId: key, // (required)
//       channelName: 'Local messasge', // (required)
//       channelDescription: 'Notification for Local message', // (optional) default: undefined.
//       importance: 4, // (optional) default: 4. Int value of the Android notification importance
//       vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
//     },
//     created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
//   );
//   PushNotification.localNotification({
//     channelId: key, //this must be same with channelid in createchannel
//     title: 'Local Message',
//     message: 'Local message !!',
//   });
// };

// export default LocalNotification;

class LocalNotification {
  constructor(parameters) {}
  alertLocalNotification() {
    const key = Date.now().toString(); // Key must be unique everytime
    console.log('local notification key: ' + key);

    PushNotification.createChannel(
      {
        channelId: key, // (required)
        channelName: 'Local messasge', // (required)
        channelDescription: 'Notification for Local message', // (optional) default: undefined.
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
    PushNotification.localNotification({
      channelId: key, //this must be same with channelid in createchannel
      title: 'Local Message',
      message: 'Local message !!',
    });

    var t = new Date();
    t.setSeconds(t.getSeconds() + 5);
    console.log('t = ' + t.toString());

    PushNotificationIOS.addNotificationRequest({
      fireDate: t,
      title: 'Test',
      subtitle: 'Test',
      // body: 'Some more description',
      sound: 'Alarm.wav',
      // category: 'userAction',
      // userInfo: {...form, id: new Date().getTime()},
      id: '111',
      threadId: '111',
      // repeats: 'day',
    });
  }
}

export default LocalNotification;
