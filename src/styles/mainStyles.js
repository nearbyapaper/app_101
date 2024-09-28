import {StyleSheet} from 'react-native';

export const mainStyles = StyleSheet.create({
  colContainer: {
    flex: 1,
    backgroundColor: '#0A1253',
    padding: 16,
  },
  rowContainer: {
    flex: 1,
    backgroundColor: '#0A1253',
    flexDirection: 'row',
    padding: 16,
  },
  selfAlignMarginVertical: {alignSelf: 'center', marginVertical: 16},
  titleTextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'gold',
    alignSelf: 'center',
  },
  scrollViewStyle: {
    flex: 1,
  },
  mainButonWithMarginRight8: {
    backgroundColor: '#62DAFB',
    paddingVertical: 10, // Space around the text vertically
    paddingHorizontal: 20, // Space around the text horizontally
    borderRadius: 5,
    alignSelf: 'flex-start', // Makes the button wrap around content
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
});
