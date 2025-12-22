import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  resultContainer: {
    flexGrow: 1,
  },
  resultContainerCentered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyResultText: {
    textAlign: 'center',
  },
  loadMoreContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
});
