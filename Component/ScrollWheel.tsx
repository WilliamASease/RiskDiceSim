import { View, StyleSheet, Text } from "react-native";
import ScrollPicker from "react-native-wheel-scrollview-picker";

const values = Array.from(Array(300).keys());
type IProps = {
  value: number;
  setValue: (toSet: number) => void;
};
const ScrollWheel = (props: IProps) => {
  const { value, setValue } = props;
  return (
    <View style={{ height: "100%", transform: [{ scaleY: -1 }] }}>
      <ScrollPicker
        dataSource={values}
        selectedIndex={value}
        onValueChange={(_v, index) => setValue(index)}
        renderItem={(data) => (
          <View style={{ transform: [{ scaleY: -1 }] }}>
            <Text>{data}</Text>
          </View>
        )}
        itemHeight={50}
      />
    </View>
  );
};

export default ScrollWheel;
