import { View, StyleSheet, Text, StyleProp, ViewStyle } from "react-native";
import { DieImage } from "../StyledComponents/ImageFactory";
import { MessageType, RollType } from "../types/types";
import { rollDie, rollPlayerType } from "../util/math";

type IProps = {
  rollState?: RollType;
  message?: MessageType;
};

const rowOfThings: StyleProp<ViewStyle> = {
  width: "100%",
  height: "100%",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
};

const halfRowOfThings: StyleProp<ViewStyle> = {
  height: "100%",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
};

const MessageDisplay = (props: IProps) => {
  const { rollState, message } = props;
  return (
    <View style={rowOfThings}>
      {rollState && (
        <>
          <View style={halfRowOfThings}>
            {rollState.atk.map((d, i) => (
              <DieImage key={i} player={"ATK"} value={d.value} />
            ))}
          </View>
          <View style={halfRowOfThings}>
            {rollState.def.map((d, i) => (
              <DieImage key={i} player={"DEF"} value={d.value} />
            ))}
          </View>
        </>
      )}
    </View>
  );
};

export default MessageDisplay;
