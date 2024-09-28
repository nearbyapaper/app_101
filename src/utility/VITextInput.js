import {StyleSheet, Text, TextInput, View} from 'react-native';

const VITextInput = ({
  inputStyle,
  labelStyle,
  label,
  value,
  action,
  isSecureTextEntry,
  isRowContent,
}) => {
  return (
    <View style={isRowContent ? styles.rowContainter : styles.container}>
      {label && (
        <Text style={labelStyle ? labelStyle : styles.labelStyle}>{label}</Text>
      )}
      <TextInput
        value={value}
        onChangeText={action}
        style={
          inputStyle
            ? inputStyle
            : isRowContent
            ? styles.defaultRowInputText
            : styles.defaultInputText
        }
        autoCapitalize="none"
        secureTextEntry={isSecureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    width: '100%',
  },
  rowContainter: {
    flexDirection: 'row',
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16, // Ensure padding inside the row container
  },
  labelStyle: {
    marginBottom: 5,
    fontWeight: 'bold',
    color: 'gold',
  },
  defaultInputText: {
    borderWidth: 1,
    borderColor: 'gold',
    padding: 10,
    color: 'gold',
    fontSize: 16,
    width: '100%',
    marginVertical: 8,
  },
  defaultRowInputText: {
    borderWidth: 1,
    borderColor: 'gold',
    padding: 10,
    color: 'gold',
    fontSize: 16,
    flex: 1, // Allow TextInput to take available space inside row
    marginVertical: 8,
    marginLeft: 8,
    paddingHorizontal: 10, // Add padding inside the TextInput
  },
});

export default VITextInput;
