import { Linking, Platform } from 'react-native';

/**
 * Try to open a link with phone browser
 * @param url url to open
 * @returns if url have been opened
 */
export const openURL = async (url: string): Promise<boolean> => {
  const supported = Platform.OS === 'android' ? true : await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
    return true;
  }
  return false;
};
