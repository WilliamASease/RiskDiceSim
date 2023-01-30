import React, { useCallback } from "react";
import { View, Text, TouchableOpacity, Image, Button } from "react-native";
import { ScreenType } from "../types/types";

type IProps = {
  setScreen: (to: ScreenType) => void;
};

export const Banner = (props: IProps) => {
  const { setScreen } = props;
  return (
    <>
      <Text
        style={{
          color: "white",
          fontSize: 27,
          fontFamily: "Times New Roman",
          fontWeight: "100",
        }}
      >
        Risk Dice Roller
      </Text>
      <View
        style={{
          position: "absolute",
          alignSelf: "flex-end",
          justifyContent: "flex-start",
          paddingRight: 10,
          paddingTop: 50,
        }}
      >
        <TouchableOpacity
          onPress={useCallback(() => setScreen("about"), [setScreen])}
        >
          <Image
            source={require("../assets/info.png")}
            style={{ borderRadius: 100 }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: "absolute",
          alignSelf: "flex-start",
          justifyContent: "flex-start",
          paddingRight: 10,
          paddingTop: 50,
        }}
      >
        <Button
          title="settings"
          onPress={useCallback(() => setScreen("settings"), [])}
        />
      </View>
    </>
  );
};
