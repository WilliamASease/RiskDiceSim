import {
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

type Iprops = {
  fightABattle: () => void;
  fightAWar: () => void;
};
export const ButtonPanel = (props: Iprops) => {
  const { fightABattle, fightAWar } = props;
  return (
    <>
      <View style={styles.button}>
        <TouchableOpacity style={styles.buttonOpacity} onPress={fightABattle}>
          <Image style={styles.image} source={require("../assets/Roll.png")} />
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <TouchableOpacity style={styles.buttonOpacity} onPress={fightAWar}>
          <Image
            style={styles.image}
            source={require("../assets/RollAll.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <TouchableOpacity style={styles.buttonOpacity}>
          <Image
            style={styles.image}
            source={require("../assets/Analyze.png")}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    justifyContent: "center",
    height: "30%",
    width: "80%",
    borderColor: "grey",
    borderWidth: 1,
    backgroundColor: "white",
  },
  buttonOpacity: { width: "100%" },
  image: { alignSelf: "center" },
});
