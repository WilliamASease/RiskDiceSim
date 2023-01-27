import { Button, View, Text } from "react-native";

type IProps = {
  popScreen: () => void;
};
const AboutView = (props: IProps) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Text>2023</Text>
      <Button title="back" onPress={props.popScreen}></Button>
    </View>
  );
};

export default AboutView;
