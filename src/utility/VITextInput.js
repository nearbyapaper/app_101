import {StyleSheet, Text, TextInput, View} from 'react-native';

const VITextInput = ({myStyle, label, value, action}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        value={value}
        onChangeText={action}
        style={myStyle ? myStyle : styles.defaultInputText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  defaultInputText: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
  },
});

export default VITextInput;
