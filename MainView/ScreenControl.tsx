import { useState } from "react";
import { View } from "react-native";
import AboutView from "./AboutView";
import MainView from "./MainView";

const ScreenControl = () => {
  const [screen, setScreen] = useState<"main" | "about" | "settings">("main");

  return (
    <View style={{ height: "100%", width: "100%" }}>
      {screen === "main" && <MainView setScreen={setScreen} />}
      {screen === "about" && (
        <AboutView
          popScreen={() => {
            setScreen("main");
          }}
        />
      )}
      {screen === "settings" && <MainView setScreen={setScreen} />}
    </View>
  );
};

export default ScreenControl;
