import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { createContactTable, dropContactTable } from "../db/dbOperations";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  //setup database
  useEffect(() => {
    // dropContactTable().then(() => {
    createContactTable()
      .then(() => {
        console.log("Database connection successful, Table created");
      })
      .catch(() => {
        console.log("Table creation failed, May be Table already exists");
      });
    // });
  }, []);

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  //colorScheme === "dark" ? DarkTheme : DefaultTheme

  return (
    <>
      <ThemeProvider value={DefaultTheme}>
        <Stack
          initialRouteName="index"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#222831",
            },
            headerTintColor: "#EEEEEE",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </ThemeProvider>
    </>
  );
}
