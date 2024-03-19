import Colors from "@/constants/Colors";
import { useFonts } from "expo-font";
import { Slot, Stack, } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, } from "react";
import { StyleSheet, } from "react-native";
import { AuthProvider, useAuth, } from "../contexts/AuthContext";
import { TaskIdProvider } from "@/contexts/TaskIdContext";
import { HandymanContextIdProvider } from "@/contexts/HandymanIdContext";
import { MenuProvider } from "react-native-popup-menu";
import Loader from "@/components/loader";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(auth)/login',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayout() {
    const { authState, userState } = useAuth()

    return (
        <>
            <RootLayoutNav />
        </>
    );
}

export default function AuthProviderWrapper() {
    const [loaded, error] = useFonts({
        roboto: require("@/assets/fonts/Roboto-Regular.ttf"),
        "roboto-medium": require("@/assets/fonts/Roboto-Medium.ttf"),
        "roboto-bold": require("@/assets/fonts/Roboto-Bold.ttf"),
        "roboto-light": require("@/assets/fonts/Roboto-Light.ttf"),
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

    return (
        <MenuProvider>
            <AuthProvider>
                <HandymanContextIdProvider>
                    <TaskIdProvider>
                        <RootLayout />
                    </TaskIdProvider>
                </HandymanContextIdProvider>
            </AuthProvider>
        </MenuProvider >
    );
}

function RootLayoutNav() {
    return (
        <Stack screenOptions={{ headerStyle: { ...headerStyles.headerStyle }, headerShown: false }}>
            <Stack.Screen
                name="(tabs)"
                options={{ headerShown: false, headerStyle: { ...headerStyles.headerStyle } }}
            />
        </Stack>
    );
}

const headerStyles = StyleSheet.create({
    headerStyle: {
        backgroundColor: Colors.primary,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
    },
    headerRight: {
        color: Colors.secondary,
        fontSize: 16,
        fontFamily: "roboto-medium",
        letterSpacing: 1.8,
    },
});
