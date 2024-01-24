import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'get-started',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'poppins': require('@/assets/fonts/Poppins-Regular.ttf'),
    'poppins-medium': require('@/assets/fonts/Poppins-Medium.ttf'),
    'poppins-bold': require('@/assets/fonts/Poppins-Bold.ttf'),
    'poppins-semibold': require('@/assets/fonts/Poppins-SemiBold.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {

  return (
    <Stack initialRouteName='get-started'>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name='get-started' options={{ headerShown: false, }} />
      <Stack.Screen name="(onboard)/auth-options" options={{ headerShown: false, }} />
      <Stack.Screen name="(onboard)/register-option" options={{ headerShown: false, animation: 'simple_push' }} />
      <Stack.Screen name="(modals)/login" options={{ headerShown: false, }} />
      <Stack.Screen name="(modals)/sign-up" options={{ headerShown: false, animation: 'simple_push',  }} />
    </Stack>
  );
}
