import { Linking } from 'react-native';

export const openURL = async (url: string): Promise<boolean> => {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
    return true;
  } else {
    return false;
  }
};