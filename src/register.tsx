import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import TouchableButtonAPI from './utility/touchable-button-api';
import {APP_THEME} from './theme';
import {RootState} from './redux/store';
import CallAPIHandler from './utility/call-api-handler';

interface RegisterProps {
  navigation: any;
}

const Register: React.FC<RegisterProps> = ({navigation}) => {
  const [name, setName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  // const isLoading = useSelector((state: RootState) => state.user.loading);
  // const error = useSelector((state: RootState) => state.user.error);

  const handleSave = () => {
    if (
      (validateEmail(email) &&
        validatePhoneNumber(phone) &&
        validatePassword(password)) ||
      true
    ) {
      // const newUser: User = {
      //   name,
      //   userName,
      //   password,
      //   email,
      //   phone,
      //   address,
      // };
      // dispatch(createUser(newUser)).then((res: any) => {
      //   console.log('User created successfully res', res);
      //   if (res) {
      //     navigation.navigate('Login');
      //   }
      // });
    }
  };
  const dispatch = useDispatch();

  const validatePhoneNumber = (number: string) => {
    const phoneRegex = /^\d{10}$/; // Regex for 10-digit phone number
    return phoneRegex.test(number);
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    // Check the length of the password
    if (password.length <= 8) {
      return false;
    }

    // Check for at least one number
    const hasNumber = /\d/.test(password);
    if (!hasNumber) {
      return false;
    }

    // Check for at least one special character
    const specialCharacters = /[@_!#$%^&*()<>?/\|}{~:]/;
    const hasSpecialCharacter = specialCharacters.test(password);
    if (!hasSpecialCharacter) {
      return false;
    }

    return true;
  };

  return (
    // <CallAPIHandler
    //   isLoading={isLoading}
    //   isError={error !== null && error ? true : false}
    //   isNotFound={false}
    //   errorMessage={error || ''}
    //   callback={handleSave}>
    <View style={styles.container}>
      <Text>Register</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Your name"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={userName}
        onChangeText={setUserName}
        placeholder="Your username"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Your password"
        secureTextEntry={true}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Your email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Your phone"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Your address"
        autoCapitalize="none"
      />
      {/* <TouchableButtonAPI
          textTitle={'Save'}
          textStyle={styles.textSave}
          buttonStyle={styles.btnSave}
          onPress={handleSave}
          containerStyle={undefined}
          isLoading={isLoading}
        /> */}
    </View>
    // </CallAPIHandler>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '60%',
    borderWidth: 1,
    padding: 10,
    marginLeft: 8,
    marginTop: 8,
  },
  btnSave: {borderWidth: 1, marginTop: 8, padding: 8, borderRadius: 5},
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  textSave: {
    fontSize: APP_THEME.textSizeMedium,
  },
});

export default Register;
