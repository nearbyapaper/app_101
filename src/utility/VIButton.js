import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

const VIButton = props => {
  const {title, action, callback, buttonStyle, textButtonStyle} = props || {};

  const handlePress = async () => {
    try {
      if (action) {
        await action(); // Call the action function
        if (callback) {
          callback(); // Call the callback if it exists
        }
      }
    } catch (error) {
      console.error('Error executing action:', error); // Handle any errors
    }
  };

  return (
    <TouchableOpacity
      style={[styles.defaultStyles, buttonStyle]}
      onPress={handlePress}>
      <Text style={[styles.defaultTextStyle, textButtonStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  defaultStyles: {
    backgroundColor: '#62DAFB',
    paddingVertical: 10, // Space around the text vertically
    paddingHorizontal: 20, // Space around the text horizontally
    borderRadius: 5,
    alignSelf: 'flex-start', // Makes the button wrap around content
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultTextStyle: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default VIButton;
