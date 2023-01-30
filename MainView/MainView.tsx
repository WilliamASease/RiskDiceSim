import { useCallback, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import DisplayNumber from "../Component/MessageDisplay";
import Feed from "../Component/Feed";
import ScrollWheel from "../Component/ScrollWheel";
import { MessageType, RollType, ScreenType } from "../types/types";
import { battle, rollDie } from "../util/math";
import MessageDisplay from "../Component/MessageDisplay";
import { Banner } from "../Component/Banner";
import { ButtonPanel } from "../Component/ButtonPanel";

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
  const [message, setMessage] = useState<MessageType | undefined>(undefined);
  const dispatchMessage = useCallback(async (to: MessageType) => {
    setMessage(to);
    await new Promise((resolve) => setTimeout(resolve, 100));
  }, []);

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
  }, [setRoll, setAtk, setDef, setScrollToValue, atk, def]);

  const fightAWar = useCallback(async () => {
    let tempAtk = atk;
    let tempDef = def;
    await dispatchMessage({
      message: [{ color: "black", value: "----WAR----" }],
      timeStamp: Date.now(),
    });
    await dispatchMessage({
      message: [{ color: "red", value: `ATK Sends ${tempAtk} Units!` }],
      timeStamp: Date.now(),
    });
    await dispatchMessage({
      message: [{ color: "blue", value: `DEF Sends ${tempDef} Units!` }],
      timeStamp: Date.now(),
    });
    await dispatchMessage({
      message: [{ color: "black", value: "-----------" }],
      timeStamp: Date.now(),
    });
    while (tempAtk > 0 && tempDef > 0) {
      const roll = battle(tempAtk > 3 ? 3 : tempAtk, tempDef > 2 ? 2 : tempDef);
      setRoll(roll);
      tempAtk -= roll.numAtkDefeated;
      tempDef -= roll.numDefDefeated;
      setAtk(tempAtk);
      setDef(tempDef);
      setScrollToValue({
        atk: tempAtk,
        def: tempDef,
      });
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    const winner =
      tempAtk > tempDef
        ? { p: "ATK", c: "red", r: tempAtk, l: atk }
        : { p: "DEF", c: "blue", r: tempDef, l: def };
    const loser =
      tempAtk < tempDef
        ? { p: "ATK", c: "red", r: tempAtk, l: atk }
        : { p: "DEF", c: "blue", r: tempDef, l: def };
    await dispatchMessage({
      message: [{ color: "black", value: "-----------" }],
      timeStamp: Date.now(),
    });
    await dispatchMessage({
      message: [
        {
          color: winner.c,
          value: `${winner.p} WINS`,
        },
      ],
      timeStamp: Date.now(),
    });
    await dispatchMessage({
      message: [
        {
          color: winner.c,
          value: `${winner.p} keeps ${winner.r} troops!`,
        },
      ],
      timeStamp: Date.now(),
    });
    await dispatchMessage({
      message: [
        {
          color: loser.c,
          value: `${loser.p} lost ${loser.l} troops!`,
        },
      ],
      timeStamp: Date.now(),
    });
    await dispatchMessage({
      message: [{ color: "black", value: "-----------" }],
      timeStamp: Date.now(),
    });
  }, [setRoll, setAtk, setDef, setScrollToValue, dispatchMessage, atk, def]);

  return (
    <View style={{ width: "100%" }}>
      <View style={styles.banner}>
        <Banner setScreen={setScreen} />
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
              setNum={useCallback(
                (toSet) => {
                  setAtk(toSet);
                  setMessage({
                    message: [
                      {
                        value: `Attacker commits ${toSet} units`,
                        color: "red",
                      },
                    ],
                    timeStamp: Date.now(),
                  });
                },
                [setAtk, setMessage]
              )}
            />
          </View>
          <View style={[{ width: "50%" }, styles.section]}>
            <Feed rollState={roll} message={message} />
          </View>
          <View style={[{ width: "25%" }, styles.section]}>
            <ScrollWheel
              player={"DEF"}
              scrollToValue={scrollToValue?.def}
              setNum={useCallback(
                (toSet) => {
                  setDef(toSet);
                  setMessage({
                    message: [
                      {
                        value: `Defender commits ${toSet} units`,
                        color: "blue",
                      },
                    ],
                    timeStamp: Date.now(),
                  });
                },
                [setDef, setMessage]
              )}
            />
          </View>
        </View>
        <View
          style={{
            height: 240,
            backgroundColor: "red",
            justifyContent: "space-evenly",
          }}
        >
          <ButtonPanel fightABattle={fightABattle} fightAWar={fightAWar} />
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
