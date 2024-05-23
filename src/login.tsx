import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import {Snackbar} from 'react-native-paper';

function Login(props): JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const {navigation} = props;

  const isFocused = useIsFocused();

  const checkLogin = () => {
    if (username != '' && password != '') {
      if (username === '1' && password === '1') {
        gotoHome();
      } else {
        onToggleSnackBar();
      }
    } else {
      onToggleSnackBar();
    }
  };

  const gotoHome = () => {
    navigation.navigate('Home');
  };

  React.useEffect(() => {
    if (isFocused) {
      setUsername('');
      setPassword('');
    }
    return () => {};
  }, [isFocused]);

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <View>
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            marginTop: 16,
          }}>
          <Text>Username : </Text>
          <TextInput
            onChangeText={val => setUsername(val)}
            value={username}
            style={{
              width: '60%',
              borderWidth: 1,
              padding: 10,
            }}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            marginTop: 16,
          }}>
          <Text>Password : </Text>
          <TextInput
            onChangeText={val => setPassword(val)}
            value={password}
            style={{
              width: '60%',
              borderWidth: 1,
              padding: 10,
            }}
            secureTextEntry={true}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              backgroundColor: '#DDDDDD',
              padding: 10,
              width: '30%',
              borderRadius: 5,
              marginTop: 16,
              marginBottom: 16,
            }}
            onPress={checkLogin}>
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Login Failed',
          onPress: () => {
            setUsername('');
            setPassword('');
          },
        }}>
        username or password is invalid
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Login;
