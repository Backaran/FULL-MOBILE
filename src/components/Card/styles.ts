import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d5d5d5',
    borderRadius: 20,
    marginVertical: 8,
    marginHorizontal: 10,
    padding: 12,

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,

    // Android shadow
    elevation: 3,
  },
});
