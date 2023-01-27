import { View, StyleSheet, Text } from "react-native";

type IProps = {
  count: Number;
  which: "ATK" | "DEF";
};
const DisplayNumber = (props: IProps) => {
  const { count, which } = props;
  return (
    <View
      style={{
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 90,
        flexDirection: "column",
      }}
    >
      <Text>{`${which}`}</Text>
      <Text>{`${count}`}</Text>
    </View>
  );
};

export default DisplayNumber;

const styles = StyleSheet.create({
  number: {
    color: "red",
  },
});
