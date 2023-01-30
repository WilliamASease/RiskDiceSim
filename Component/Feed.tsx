import { useCallback, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { MessageType, RollType } from "../types/types";
import { cloneDeep } from "../util/tools";

type IProps = {
  rollState?: RollType;
  message?: MessageType;
};

type feedType =
  | { type: "roll"; payload: RollType }
  | { type: "message"; payload: MessageType };

const MAX_ELEMENTS = 100;

const Feed = (props: IProps) => {
  const { rollState, message } = props;
  const [offSet, setOffset] = useState(0);
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
      setOffset(offSet + 35);
    },
    [feedList, setOffset, offSet]
  );

  useEffect(() => {
    if (rollState) {
      pushToFeedList({ type: "roll", payload: rollState });
    }
  }, [rollState]);

  useEffect(() => {
    if (message) {
      pushToFeedList({ type: "message", payload: message });
    }
  }, [message]);

  return (
    <ScrollView
      style={{ backgroundColor: "lightgrey", height: 420 }}
      snapToInterval={35}
      contentOffset={{ x: 0, y: offSet }}
    >
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
              <View style={{ width: "50%", flexDirection: "row" }}>
                <Text
                  style={{
                    color:
                      v.payload.balance > 0
                        ? "blue"
                        : v.payload.balance === 0
                        ? "black"
                        : "red",
                    fontFamily: "Times New Roman",
                    fontSize: 20,
                  }}
                >
                  {Math.abs(v.payload.balance) === 2
                    ? "WIN x2"
                    : Math.abs(v.payload.balance) === 1
                    ? "WIN"
                    : "EVEN"}
                </Text>
              </View>
            </View>
          );
        }
        if (v.type === "message") {
          return (
            <View key={i} style={{ flexDirection: "row" }}>
              {v.payload.message.map((t, i) => (
                <Text
                  key={i}
                  style={{
                    color: t.color,
                    fontFamily: "Times New Roman",
                    fontSize: 20,
                  }}
                >
                  {t.value + " "}
                </Text>
              ))}
            </View>
          );
        }
      })}
    </ScrollView>
  );
};

export default Feed;
