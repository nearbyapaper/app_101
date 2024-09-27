import {StyleSheet, Text} from 'react-native';

export const VIText = props => {
  const {title, myStyle} = props || {};

  return (
    <Text style={myStyle ? myStyle : styles.defaultTextStyle}>{title}</Text>
  );
};

const styles = StyleSheet.create({
  defaultTextStyle: {
    color: 'gold',
    fontWeight: 'normal',
    fontSize: 16,
  },
});

export default VIText;
