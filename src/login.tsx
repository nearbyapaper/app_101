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
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from './redux/store';
import {APP_THEME} from './theme';
import TouchableButtonAPI from './utility/touchable-button-api';
import VIText from './utility/VIText';
import {mainStyles} from './styles/mainStyles';

function Login({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  // const userLoginReducer = useSelector((state: RootState) => state.user.user);
  // const loading = useSelector((state: RootState) => state.user.loading);

  // useEffect(() => {
  //   if (userLoginReducer) {
  //     navigation.navigate('Home');
  //   } else {
  //     setSnackbarMessage('Please enter both username and password');
  //     setSnackbarVisible(true);
  //   }
  // }, [navigation, userLoginReducer]);

  const checkLogin = () => {
    if (!username || !password) {
      setSnackbarMessage('Please enter both username and password');
      setSnackbarVisible(true);
      return;
    }

    if (username === '1' && password === '1') {
      navigation.navigate('Home');
    } else {
      // dispatch(
      //   loginUser({
      //     userName: username,
      //     password: password,
      //   }),
      // );
    }
  };

  useEffect(() => {
    if (isFocused) {
      setUsername('');
      setPassword('');
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={[styles.container, mainStyles.colContainer]}>
      <View style={styles.inputContainer}>
        <Text>Username:</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          // keyboardType="web-search"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Password:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
      </View>
      <TouchableButtonAPI
        textTitle={'Login'}
        textStyle={styles.textLogin}
        buttonStyle={styles.button}
        onPress={checkLogin}
        containerStyle={styles.buttonContainer}
        isLoading={false}
      />
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
    backgroundColor: APP_THEME.buttonActive,
    padding: 10,
    width: '30%',
    borderRadius: 5,
  },
  registerButton: {
    backgroundColor: APP_THEME.buttonInactive,
  },
  registerButtonText: {
    color: 'white',
  },
  textLogin: {
    color: APP_THEME.textColorWhite,
  },
});

export default Login;
