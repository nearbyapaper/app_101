import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {APP_THEME} from '../theme';

interface TouchableButtonAPIProps {
  textTitle: string;
  textStyle: any;
  buttonStyle: any;
  onPress: any;
  containerStyle: any;
  isLoading: boolean;
}

const TouchableButtonAPI: React.FC<TouchableButtonAPIProps> = ({
  textTitle,
  textStyle,
  buttonStyle,
  onPress,
  containerStyle,
  isLoading,
}) => {
  return (
    <View
      style={containerStyle ? containerStyle : styles.defaultContainerStyle}>
      <TouchableOpacity style={buttonStyle} onPress={onPress}>
        {isLoading ? (
          <ActivityIndicator size="small" color={APP_THEME.buttonActive} />
        ) : (
          <Text style={textStyle}>{textTitle}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  defaultContainerStyle: {
    flex: 1,
  },
});

export default TouchableButtonAPI;
