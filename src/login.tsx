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
import VITextInput from './utility/VITextInput';
import VIButton from './utility/VIButton';

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
        <VITextInput
          label={'Username : '}
          value={username}
          action={setUsername}
        />
      </View>
      <View style={styles.inputContainer}>
        <VITextInput
          label={'Password : '}
          value={password}
          action={setPassword}
          isSecureTextEntry={true}
        />
      </View>
      <View
        style={{
          alignSelf: 'center',
          flexDirection: 'row',
        }}>
        <VIButton
          title={'Login'}
          action={checkLogin}
          style={{marginRight: 8}}
          buttonStyle={mainStyles.mainButonWithMarginRight8}
        />

        <VIButton
          title={'Register'}
          action={() => navigation.navigate('Register')}
        />
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
    marginHorizontal: 24,
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
