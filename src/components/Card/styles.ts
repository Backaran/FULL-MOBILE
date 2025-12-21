import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
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
  regularContainer: {
    backgroundColor: '#d5d5d5',
  },
  errorContainer: {
    backgroundColor: 'red',
  },
  errorText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  selectionContainer: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  dismissibleContainer: {
    position: 'absolute',
    top: -10,
    right: -7.5,
  }
});
