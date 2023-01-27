import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { cloneDeep } from "../util/tools";

type IProps = {
  nextString?: string;
  setMsg: (to: string | undefined) => void;
  maxLines?: number;
};
const Feed = (props: IProps) => {
  const { nextString, setMsg, maxLines = 24 } = props;
  const [feedList, setFeedList] = useState<string[]>([]);

  useEffect(() => {
    if (nextString) {
      feedList.push(nextString);
      setFeedList(
        cloneDeep(
          feedList.slice(feedList.length > maxLines - 1 ? 1 : 0, maxLines)
        )
      );
      setMsg(undefined);
    }
  }, [nextString, feedList, setFeedList]);

  return (
    <View style={{ backgroundColor: "lightgrey", height: "100%" }}>
      {feedList.map((v, i) => (
        <Text key={i}>{v}</Text>
      ))}
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({
  number: {
    color: "red",
  },
});
