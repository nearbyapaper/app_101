import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {User, createUser} from './redux/actions/user-action';

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

  // const userReducer = useSelector((state: RootState) => state.user.user);

  // console.log('userReducer : ', userReducer);

  const handleSave = () => {
    if (
      (validateEmail(email) &&
        validatePhoneNumber(phone) &&
        validatePassword(password)) ||
      true
    ) {
      const newUser: User = {
        name,
        userName,
        password,
        email,
        phone,
        address,
      };
      dispatch({type: 'ADD_USER', payload: newUser});
      dispatch(createUser(newUser));
      navigation.navigate('Login');
    }
  };
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     return () => {
  //       console.log('clean up state');
  //       setName('');
  //     };
  //   }, []);

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
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Register</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Your name"
      />
      <TextInput
        style={styles.input}
        value={userName}
        onChangeText={setUserName}
        placeholder="Your username"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Your password"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Your email"
      />
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Your phone"
      />
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Your address"
      />
      <TouchableOpacity
        onPress={handleSave}
        style={{borderWidth: 1, marginTop: 8, padding: 8, borderRadius: 5}}>
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
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
});

export default Register;
