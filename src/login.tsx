import React, {useState, useEffect} from 'react';
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
import {useDispatch} from 'react-redux';
import {loginUser} from './redux/actions/user-action';

function Login({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const checkLogin = () => {
    if (!username || !password) {
      setSnackbarMessage('Please enter both username and password');
      setSnackbarVisible(true);
      return;
    }

    if (username === '1' && password === '1') {
      navigation.navigate('Home');
    } else {
      // setSnackbarMessage('Invalid username or password');
      // setSnackbarVisible(true);
      // dispatch({
      //   type: 'user/loginUser',
      //   payload: {
      //     userName: username,
      //     password: password,
      //   },
      // });
      // dispatch(loginUser(userName: username, password: password));
      // dispatch({
      //   type: 'user/loginUser',
      //   payload: {
      //     userName: username,
      //     password: password,
      //   },
      // }).then((response: any) => {
      //   if (response) {
      //     navigation.navigate('Home');
      //   } else {
      //     setSnackbarMessage('Invalid username or password');
      //     setSnackbarVisible(true);
      //     return;
      //   }
      // });

      dispatch(loginUser({userName: username, password: password}))
        .then(response => {
          console.log('Mobile side - login result response : ' + response);

          console.log(
            'Mobile side - login result response.payload : ' + response.payload,
          );

          console.log(
            'Mobile side - login result response.payload.success : ' +
              response.payload.success,
          );
          if (response.payload.success) {
            navigation.navigate('Home');
          } else {
            setSnackbarMessage('Invalid username or password');
            setSnackbarVisible(true);
          }
        })
        .catch(error => {
          setSnackbarMessage('An error occurred');
          setSnackbarVisible(true);
        });
    }
  };

  useEffect(() => {
    if (isFocused) {
      setUsername('');
      setPassword('');
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>Username:</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Password:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={checkLogin}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.registerButton]}
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: 'Dismiss',
          onPress: () => setSnackbarVisible(false),
        }}>
        {snackbarMessage}
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  input: {
    width: '60%',
    borderWidth: 1,
    padding: 10,
    marginLeft: 8,
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: '30%',
    borderRadius: 5,
  },
  registerButton: {
    backgroundColor: 'blue',
  },
  registerButtonText: {
    color: 'white',
  },
});

export default Login;
