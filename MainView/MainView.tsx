import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import DisplayNumber from "../Component/DisplayNumber";
import Feed from "../Component/Feed";
import ScrollWheel from "../Component/ScrollWheel";
import { screenType } from "../types/types";
import { rollDie } from "../util/math";

type IProps = {
  setScreen: (to: screenType) => void;
};

const MainView = (props: IProps) => {
  const { setScreen } = props;

  const [atk, setAtk] = useState(0);
  const [def, setDef] = useState(0);
  const [msg, setMsg] = useState<string | undefined>(undefined);

  return (
    <View style={{ width: "100%" }}>
      <View style={styles.banner}>
        <Text style={styles.banner_title}>Risk Dice Roller</Text>
        <View
          style={{
            position: "absolute",
            alignSelf: "flex-end",
            justifyContent: "flex-start",
          }}
        >
          <Button title="about" onPress={() => setScreen("about")} />
        </View>
      </View>
      <View style={styles.numbers}>
        <DisplayNumber which="ATK" count={atk} />
        <DisplayNumber which="DEF" count={def} />
      </View>
      <View style={styles.background}>
        <View style={{ height: "65%", flexDirection: "row" }}>
          <View style={[{ width: "25%" }, styles.section]}>
            <ScrollWheel value={atk} setValue={setAtk} />
          </View>
          <View style={[{ width: "50%" }, styles.section]}>
            <Feed nextString={msg} setMsg={setMsg} />
          </View>
          <View style={[{ width: "25%" }, styles.section]}>
            <ScrollWheel value={def} setValue={setDef} />
          </View>
        </View>
        <View style={{ height: "35%", backgroundColor: "red" }}>
          <View style={styles.button}>
            <Button
              title="Roll"
              onPress={() => setMsg("" + rollDie())}
            ></Button>
          </View>
          <View style={styles.button}>
            <Button title="Roll Until Done"></Button>
          </View>
          <View style={styles.button}>
            <Button title="Analyze"></Button>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    height: "10%",
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  banner_title: {
    color: "white",
    fontSize: 27,
  },
  numbers: {
    height: "10%",
    backgroundColor: "grey",
    flexDirection: "row",
  },
  background: {
    height: "80%",
    backgroundColor: "grey",
  },
  section: {
    borderColor: "black",
    borderWidth: 1,
  },
  button: {
    alignSelf: "center",
    justifyContent: "center",
    height: "30%",
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 90,
  },
});

export default MainView;
