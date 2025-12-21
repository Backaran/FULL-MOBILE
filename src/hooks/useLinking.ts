import { Alert } from 'react-native';
import { openURL } from '../utils/linking';

interface UseLinkingResult {
  /** used to open url link */
  openUrl: (url: string) => Promise<boolean>;
}

/**
 * Hook for linking
 * @returns openUrl : used to open url link
 */
const useLinking = (): UseLinkingResult => {
  const open = async (url: string) => {
    const result: boolean = await openURL(url);
    if (!result) {
      Alert.alert('Error', 'Impossible to open link !');
    }
    return result;
  };
  return {
    openUrl: open
  };
};

export default useLinking;
