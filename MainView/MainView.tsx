import { useCallback, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import DisplayNumber from "../Component/MessageDisplay";
import Feed from "../Component/Feed";
import ScrollWheel from "../Component/ScrollWheel";
import { RollType, ScreenType } from "../types/types";
import { battle, rollDie } from "../util/math";
import MessageDisplay from "../Component/MessageDisplay";

type IProps = {
  setScreen: (to: ScreenType) => void;
};

const MainView = (props: IProps) => {
  const { setScreen } = props;

  const [atk, setAtk] = useState(1);
  const [def, setDef] = useState(1);
  const [scrollToValue, setScrollToValue] = useState<
    { atk: number; def: number } | undefined
  >(undefined);
  const [roll, setRoll] = useState<RollType | undefined>(undefined);

  const fightABattle = useCallback(() => {
    if (atk > 0 && def > 0) {
      const roll = battle(atk > 3 ? 3 : atk, def > 2 ? 2 : def);
      setRoll(roll);
      setAtk(atk - roll.numAtkDefeated);
      setDef(def - roll.numDefDefeated);
      setScrollToValue({
        atk: atk - roll.numAtkDefeated,
        def: def - roll.numDefDefeated,
      });
    }
    return atk === 0 || def === 0;
  }, [setRoll, setAtk, setDef, setScrollToValue, atk, def]);

  const fightAWar = useCallback(() => {
    let done = false;
    while (!done) {
      done = fightABattle();
    }
  }, [fightABattle]);

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
      <View style={styles.message}>
        <MessageDisplay rollState={roll} />
      </View>
      <View style={styles.background}>
        <View style={{ height: 420, flexDirection: "row" }}>
          <View style={[{ width: "25%" }, styles.section]}>
            <ScrollWheel
              player={"ATK"}
              scrollToValue={scrollToValue?.atk}
              setNum={setAtk}
            />
          </View>
          <View style={[{ width: "50%" }, styles.section]}>
            <Feed rollState={roll} />
          </View>
          <View style={[{ width: "25%" }, styles.section]}>
            <ScrollWheel
              player={"DEF"}
              scrollToValue={scrollToValue?.def}
              setNum={setDef}
            />
          </View>
        </View>
        <View style={{ height: 260, backgroundColor: "red" }}>
          <View style={styles.button}>
            <Button title="Roll" onPress={fightABattle}></Button>
          </View>
          <View style={styles.button}>
            <Button title="Roll Until Done" onPress={fightAWar}></Button>
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
    height: 90,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  banner_title: {
    color: "white",
    fontSize: 27,
  },
  message: {
    height: 90,
    backgroundColor: "grey",
    flexDirection: "row",
  },
  background: {
    height: "100%",
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
