import { View, Text } from "react-native";
import { PlayerType } from "../types/types";

export const StyledPlayerName = (props: { player: PlayerType }) => {
  return (
    <View>
      <Text
        style={{
          color: props.player === "ATK" ? "red" : "blue",
          fontFamily: "Times New Roman",
          fontSize: 40,
        }}
      >
        {props.player}
      </Text>
    </View>
  );
};
