import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import GithubUserSearchScreen from './src/screens/GithubUserSearchScreen';
import { StoreProvider } from './src/providers/storeProvider';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <StoreProvider>
        <GithubUserSearchScreen />
      </StoreProvider>
    </SafeAreaProvider>
  );
}

export default App;
