import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  map: {
    width: Dimensions.get('window').width - 40,
    height: 200,
    borderRadius: 10,
    marginTop: 20,
  },
});
