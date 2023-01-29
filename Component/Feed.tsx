import { useCallback, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { RollType } from "../types/types";
import { cloneDeep } from "../util/tools";

type IProps = {
  rollState?: RollType;
};

type feedType = { type: "roll"; payload: RollType };

const MAX_ELEMENTS = 30;

const Feed = (props: IProps) => {
  const { rollState } = props;
  const [feedList, setFeedList] = useState<feedType[]>([]);
  const pushToFeedList = useCallback(
    (toPush: feedType) => {
      feedList.push(toPush);
      setFeedList(
        cloneDeep(
          feedList.slice(
            feedList.length > MAX_ELEMENTS - 1 ? 1 : 0,
            MAX_ELEMENTS
          )
        )
      );
    },
    [feedList]
  );

  useEffect(() => {
    if (rollState) {
      pushToFeedList({ type: "roll", payload: rollState });
    }
  }, [rollState]);

  return (
    <ScrollView style={{ backgroundColor: "lightgrey", height: "100%" }}>
      {feedList.map((v, i) => {
        if (v.type === "roll") {
          return (
            <View key={i} style={{ flexDirection: "row" }}>
              <View style={{ width: "50%", flexDirection: "row" }}>
                {v.payload.atk.map((v, i) => (
                  <Text
                    key={i}
                    style={{
                      textDecorationLine: v.defeated ? "line-through" : "none",
                      color: v.active ? "red" : "grey",
                      fontFamily: "Times New Roman",
                      fontSize: 20,
                    }}
                  >{`${v.value} `}</Text>
                ))}
                {v.payload.def.map((v, i) => (
                  <Text
                    key={i}
                    style={{
                      textDecorationLine: v.defeated ? "line-through" : "none",
                      color: v.active ? "blue" : "grey",
                      fontFamily: "Times New Roman",
                      fontSize: 20,
                    }}
                  >
                    {`${v.value} `}
                  </Text>
                ))}
              </View>
              <View style={{ width: "25%", flexDirection: "row" }}>
                {v.payload.numAtkDefeated !== 0 && (
                  <Text
                    style={{
                      color: "red",
                      fontFamily: "Times New Roman",
                      fontSize: 20,
                    }}
                  >
                    {` (-${v.payload.numAtkDefeated})`}
                  </Text>
                )}
              </View>
              {v.payload.numDefDefeated !== 0 && (
                <Text
                  style={{
                    color: "blue",
                    fontFamily: "Times New Roman",
                    fontSize: 20,
                  }}
                >
                  {` (-${v.payload.numDefDefeated})`}
                </Text>
              )}
            </View>
          );
        }
      })}
    </ScrollView>
  );
};

export default Feed;
