import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { StyledPlayerName } from "../StyledComponents/StyledTextFactory";
import { PlayerType } from "../types/types";

type IProps = {
  player: PlayerType;
  scrollToValue?: number;
  setNum: (a: number) => void;
};

const SCROLL_INTERVAL = 60;
const ENTRIES = 100;
const values = Array.from({ length: ENTRIES }, (_, i) => (i + 1).toString())
  .concat([" ", " ", " "])
  .reverse()
  .concat(["LOSE", " ", " "]);

const ScrollPicker = (props: IProps) => {
  const { scrollToValue, setNum, player } = props;

  const [mustScroll, setMustScroll] = useState<number | undefined>(undefined);
  useEffect(() => {
    if (mustScroll !== scrollToValue) {
      setMustScroll(scrollToValue);
    }
  }, [scrollToValue, setMustScroll, mustScroll, player]);

  return (
    <View style={{ height: 420, backgroundColor: "white" }}>
      <ScrollView
        onScrollEndDrag={(event) => {
          setNum(
            ENTRIES -
              Math.round(
                event.nativeEvent.targetContentOffset!.y / SCROLL_INTERVAL
              )
          );
        }}
        snapToInterval={SCROLL_INTERVAL}
        scrollEventThrottle={16}
        bounces={false}
        contentOffset={{
          x: 0,
          y: SCROLL_INTERVAL * (ENTRIES - (mustScroll ?? 1)),
        }}
      >
        {values.map((item, i) => {
          return (
            <View
              key={i}
              style={{
                height: SCROLL_INTERVAL,
                borderColor: "black",
                borderWidth: 1,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 20,
                  fontFamily: "Times New Roman",
                }}
              >
                {item}
              </Text>
            </View>
          );
        })}
      </ScrollView>
      <View
        style={{
          height: SCROLL_INTERVAL,
          transform: [{ translateY: SCROLL_INTERVAL * 3 }],
          width: "100%",
          position: "absolute",
          alignSelf: "flex-start",
          justifyContent: "center",
          borderColor: player === "ATK" ? "red" : "blue",
          borderWidth: 5,
        }}
      />

      <View
        style={{
          height: SCROLL_INTERVAL,
          position: "absolute",
          width: "100%",
          backgroundColor: "lightgrey",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <StyledPlayerName player={player} />
      </View>
    </View>
  );
};

export default ScrollPicker;
