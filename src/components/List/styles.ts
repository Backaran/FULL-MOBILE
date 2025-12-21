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
