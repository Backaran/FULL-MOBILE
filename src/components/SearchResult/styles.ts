import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    flexDirection: 'row',
  },
  selectionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 15,
  },
  selectionText: {
    fontSize: 16,
  },
  selectionCountText: {
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  resultContainer: {
    flex: 1,
  },
  emptyResultText: {
    textAlign: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
