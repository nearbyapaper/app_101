import React from 'react';
import {ActivityIndicator, Button, StyleSheet, Text, View} from 'react-native';
import {APP_THEME} from '../theme';

interface CallAPIHandlerProps {
  isLoading: boolean;
  isError: boolean;
  isNotFound: boolean;
  errorMessage: string;
  callback: () => void;
  children: any;
}

interface ErrorProps {
  callback: () => void;
  errorMessage: string;
}

const Loading: React.FC = () => {
  return (
    <View style={styles.containerLoading}>
      <ActivityIndicator size="large" color="#00ff00" />
      <Text style={styles.textStatus}>Loading...</Text>
    </View>
  );
};

const Error: React.FC<ErrorProps> = ({callback, errorMessage}) => {
  return (
    <View style={styles.containerError}>
      <Text style={styles.textStatus}>Error...</Text>
      <Text style={styles.textErrorDetail}>{errorMessage} </Text>
      <Button title="Retry" onPress={callback} />
    </View>
  );
};

const NotFound = () => {
  return (
    <View style={styles.containerNotFound}>
      <Text style={styles.textStatus}>Not Found</Text>
    </View>
  );
};

const CallAPIHandler: React.FC<CallAPIHandlerProps> = ({
  isLoading,
  isError,
  isNotFound,
  errorMessage,
  callback,
  children,
}) => {
  return (
    <View style={styles.container}>
      {!isLoading && !isError && !isNotFound ? children : <></>}
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Error callback={callback} errorMessage={errorMessage} />
      ) : isNotFound ? (
        <NotFound />
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    alignContent: 'center',
  },
  containerLoading: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  containerError: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerNotFound: {
    flex: 1,
    margin: 24,
    alignItems: 'center',
  },
  textStatus: {
    color: APP_THEME.textColorBlack,
    fontSize: APP_THEME.textSizeExtraLarge,
    textAlign: 'center',
  },
  textErrorDetail: {
    color: APP_THEME.textColorBlack,
    fontSize: APP_THEME.textSizeLarge,
  },
});

export default CallAPIHandler;
