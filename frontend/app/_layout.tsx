import { Stack } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import { View, Text } from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import "./globals.css";
import useAuth, { AuthProvider } from "@/context/useAuth";
import { ToastProvider } from "react-native-toast-notifications";
import { Ionicons } from "@expo/vector-icons";
SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        console.log("Loading fonts...");
        await Font.loadAsync({
          "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
          "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
          "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
          "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
        });
        console.log("Fonts loaded successfully!");
      } catch (e) {
        console.warn("Error loading fonts:", e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);
  if (!appIsReady) {
    return null;
  }
  return (
    <ToastProvider
        placement="top"
        duration={3000}
        animationType="slide-in"
        animationDuration={250}
        successColor="#4CAF50"
        dangerColor="#FF5252"
        warningColor="#FFC107"
        normalColor="#757575"
        offsetTop={40}
        swipeEnabled={true}
        renderToast={(toastOptions) => {
          let backgroundColor = '#757575';
          if (toastOptions.type === 'danger') {
            backgroundColor = '#FF5252';
          } else if (toastOptions.type === 'success') {
            backgroundColor = '#4CAF50';
          }
          let iconName: keyof typeof Ionicons.glyphMap = 'information-circle';
          if (toastOptions.type === 'danger') {
            iconName = 'alert-circle';
          } else if (toastOptions.type === 'success') {
            iconName = 'checkmark-circle';
          }
          return (
            <View
              style={[
                {
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderRadius: 8,
                  marginHorizontal: 16,
                  marginVertical: 4,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                },
              ]}
            >
              <Ionicons
                name={iconName}
                size={24}
                color="white"
                style={{ marginRight: 12 }}
              />
              <Text style={{
                color: 'white',
                fontSize: 14,
                fontFamily: 'Poppins-Medium',
                flex: 1,
              }}>
                {toastOptions.message}
              </Text>
            </View>
          );
        }}
      >
      <AuthProvider>
        <AppContent onLayoutRootView={onLayoutRootView} />
      </AuthProvider>
    </ToastProvider>
  );
}
type AppContentProps = {
  readonly onLayoutRootView: () => void;
};
function AppContent({ onLayoutRootView }: AppContentProps) {
  const { user } = useAuth();
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="index"
          redirect={!!user}
        />
        <Stack.Screen
          name="(auth)"
          redirect={!!user}
        />
        <Stack.Screen
          name="(tabs)"
          redirect={!user}
        />
        <Stack.Screen
          name="UpdateCar"
          redirect={!user}
        />
        <Stack.Screen
          name="+not-found"
        />
      </Stack>
    </View>
  );
}