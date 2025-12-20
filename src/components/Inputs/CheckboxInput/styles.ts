import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    width: 22,
    height: 22,
    borderWidth: 4,
    borderColor: 'black',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerEnabled: {
    backgroundColor: '#00a1fe',
  },
  containerDisabled: {
    backgroundColor: 'white',
  },
  text: {
    width: 16,
    height: 16,
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
